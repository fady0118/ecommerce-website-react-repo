import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext";

export const CartContext = createContext(null);

export default function CartProvider({ children }) {
  const { user } = useAuth(); // {email:"userEmail"}
  const [cartItems, setCartItems] = useState([]);

  // update cart from localStorage
  function updateCartItemsState() {
    console.log("updating cart items...");
    // if there's no user logged in
    if (!user) {
      console.log("no user found, returning");
      // clear cartState
      setCartItems([]);
      return;
    }
    // check localStorage get userList update the cartItems State with the list
    // get the cartItems from the localStorage
    const savedCartList = JSON.parse(localStorage.getItem("cartItems") || "[]"); // [{userEmail:[{id:2, quantity:4},{...}] }]
    console.log({ savedCartList });
    // check if savedCartList includes the user's list
    const currentUserCartItems = savedCartList.find((currentList) => Object.keys(currentList)[0] === user.email) || { [user.email]: [] };
    console.log({ currentUserCartItems });
    setCartItems(currentUserCartItems);
  }

  useEffect(() => {
    // if the userState changes update the cart
    updateCartItemsState();
  }, [user]);

  function addToCart(productId) {
    // we need to get the current user from localStorage if there's none we tell the user to login
    if (!user.email) {
      alert("user must be logged in");
      return;
    }

    // get the current cart state
    const currentUserCartItems = cartItems;
    console.log({ currentUserCartItems });

    // check if product exists in the user's cartList
    const existing = currentUserCartItems[user.email]?.find((item) => item.id === productId);
    console.log({ existing });

    // add item to cart
    let updatedCartItems;
    if (existing) {
      const currentQuantity = existing.quantity;
      updatedCartItems = currentUserCartItems[user.email].map((item) => (item.id === productId ? { id: productId, quantity: currentQuantity + 1 } : item));
    } else {
      updatedCartItems = currentUserCartItems[user.email] ? [...currentUserCartItems[user.email], { id: productId, quantity: 1 }] : [{ id: productId, quantity: 1 }];
    }
    console.log({ updatedCartItems });
    const updatedUserCartList = { [user.email]: updatedCartItems };
    // update the state
    setCartItems(updatedUserCartList); // {userEmail:[{id:2, quantity:4},{...}] }

    // save updated list to localStorage
    // rn cartItem state is the current user items if we save it in localStorage it'll override other users
    const savedCartList = JSON.parse(localStorage.getItem("cartItems") || "[]");
    console.log({ savedCartList });
    // @todo update userItems in the localStorage then save
    const [currentKey] = Object.keys(updatedUserCartList);
    console.log({ currentKey });
    const existingIndex = savedCartList.findIndex((currentList) => currentKey in currentList);
    let updatedCartList;
    if (existingIndex === -1) {
      updatedCartList = [...savedCartList, { [user.email]: updatedCartItems }]; //this only works if the user list doesn't exist
    } else {
      updatedCartList = savedCartList.map((currentList, index) => (index === existingIndex ? { [user.email]: updatedCartItems } : currentList)); //this only works if the user list doesn't exist
    }
    console.log({ updatedCartList });
    localStorage.setItem("cartItems", JSON.stringify(updatedCartList));
  }

  return <CartContext.Provider value={{ cartItems, addToCart, updateCartItemsState }}>{children}</CartContext.Provider>;
}

// custom auth hook
export function useCart() {
  const context = useContext(CartContext);
  return context;
}
