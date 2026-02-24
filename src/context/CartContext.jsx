import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext";
import { getProductById } from "../data/products";

export const CartContext = createContext(null);

export default function CartProvider({ children }) {
  const { user } = useAuth(); // {email:"userEmail"}
  const [cartItems, setCartItems] = useState([]);

  // update cart from localStorage
  function updateCartItemsState() {
    // if there's no user logged in
    if (!user) {
      // clear cartState
      setCartItems([]);
      return;
    }
    // check localStorage get userList update the cartItems State with the list
    // get the cartItems from the localStorage
    const savedCartList = JSON.parse(localStorage.getItem("cartItems") || "[]"); // [{userEmail:[{id:2, quantity:4},{...}] }]
    // check if savedCartList includes the user's list
    const currentUserCartItems = savedCartList.find((currentList) => Object.keys(currentList)[0] === user.email) || { [user.email]: [] };
    setCartItems(currentUserCartItems);
  }

  useEffect(() => {
    // if the userState changes update the cart
    updateCartItemsState();
  }, [user]);

  function addToCart(productId) {
    // we need to get the current user from localStorage if there's none we tell the user to login
    if (!user?.email) {
      alert("user must be logged in");
      return;
    }
    // get the current cart state
    const currentUserCartItems = cartItems;

    // check if product exists in the user's cartList
    const existing = currentUserCartItems[user.email]?.find((item) => item.id === productId);
    // add item to cart
    let updatedCartItems;
    if (existing) {
      const currentQuantity = existing.quantity;
      if(currentQuantity >= 20) return;
      updatedCartItems = currentUserCartItems[user.email].map((item) => (item.id === productId ? { id: productId, quantity: currentQuantity + 1 } : item));
    } else {
      updatedCartItems = currentUserCartItems[user.email] ? [...currentUserCartItems[user.email], { id: productId, quantity: 1 }] : [{ id: productId, quantity: 1 }];
    }
    // update the state
    const updatedUserCartList = { [user.email]: updatedCartItems };
    setCartItems(updatedUserCartList); // {userEmail:[{id:2, quantity:4},{...}] }

    // update localStorage (DB)
    updateLocalStorage(updatedUserCartList);
  }

  // function for checkout item controls (+,-)
  function updateQuantity(productId, type) {
    // user check
    if (!user?.email) {
      alert("user must be logged in");
      return;
    }
    const valueOfType = type === "plus" ? 1 : -1;
    // boundary condition (0,20)
    // if quantity is 20 you can only reduce
    // if quantity is 0 you can only add
    const currentItem = cartItems[user.email]?.find((item) => item.id === productId);
    if (!currentItem) return;
    const itemQuantity = currentItem.quantity;
    if (itemQuantity + valueOfType > 20) {
      return;
    } else if (itemQuantity + valueOfType < 0) {
      return;
    }
    // update the state
    const updatedCart = cartItems[user.email].map((item) => (item.id === productId ? { id: item.id, quantity: item.quantity + valueOfType } : item));
    const updatedUserCartList = { [user.email]: updatedCart };
    setCartItems(updatedUserCartList);
    // save the updated state to localStorage
    updateLocalStorage(updatedUserCartList);
  }

  // remove item from cart
  function removeItem(productId) {
    // user check
    if (!user?.email) {
      alert("user must be logged in");
      return;
    }
    const updatedCartList = (cartItems[user.email]??[]).filter((item) => item.id !== productId);
    const updatedUserCartList = { [user.email]: updatedCartList };
    // update the state
    setCartItems(updatedUserCartList);
    // save the updated state to localStorage
    updateLocalStorage(updatedUserCartList);
  }
  function getCartTotal() {
    const total = cartItems[user.email]?.reduce((total, item) => {
      const product = getProductById(item.id);
      total += product ? product.price * item.quantity : 0;
      return total;
    }, 0);
    return total;
  }
  function clearCart() {
    if(!user?.email) return;
    // clear cart state
    setCartItems({ [user.email]: [] });
    // update localStorage
    updateLocalStorage({ [user.email]: [] });
  }
  function placeOrder() {
    alert("Successful Order!");
    clearCart();
  }
  return <CartContext.Provider value={{ cartItems, addToCart, updateCartItemsState, updateQuantity, removeItem, getCartTotal, placeOrder }}>{children}</CartContext.Provider>;
}

function updateLocalStorage(updatedUserCartList) {
  // save updated list to localStorage
  const savedCartList = JSON.parse(localStorage.getItem("cartItems") || "[]");
  // check if the user has a saved list in localStorage
  const [currentKey] = Object.keys(updatedUserCartList); // key is the current user email
  const existingIndex = savedCartList.findIndex((currentList) => currentKey in currentList);
  let updatedCartList;
  if (existingIndex === -1) {
    // if the user has no cartList in the localStorage we add it
    updatedCartList = [...savedCartList, updatedUserCartList]; //this only works if the user list doesn't exist
  } else {
    // if the user already has a list we update it
    updatedCartList = savedCartList.map((currentList, index) => (index === existingIndex ? updatedUserCartList : currentList)); //this only works if the user list doesn't exist
  }
  // update localStorage
  localStorage.setItem("cartItems", JSON.stringify(updatedCartList));
}

// custom auth hook
export function useCart() {
  const context = useContext(CartContext);
  return context;
}
