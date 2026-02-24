import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import { getProductById, getProducts } from "../data/products";
import { useEffect } from "react";

function CheckoutPage() {
  const { user } = useAuth();
  const { cartItems, updateCartItemsState, updateQuantity } = useCart(); // [currentUser:{id:2, quantity:4},{...}] -> { id, image, name, description, price, quantity, total_price }

  if (!user) {
    return (
      <>
        <h1>User not logged in</h1>
        <Link to="/auth/login" style={{ fontSize: "3rem" }}>
          login
        </Link>
      </>
    );
  }
  // if(!cartItems[user.email]){
  //   updateCartItemsState()
  // }
  useEffect(() => {
    if (user && !cartItems[user.email]) {
      updateCartItemsState();
    }
  }, [user, cartItems, updateCartItemsState]);

  // we need to grab each item details from the data/products.js
  console.log("checkout page",cartItems)
  const cartItemsDetails = cartItems[user.email]?.map((item) => {
    const itemDetails = getProductById(item.id);
    return { ...itemDetails, quantity: item.quantity };
  }); // { id, image, name, description, price, quantity }
  console.log({ cartItemsDetails });

  return (
    <>
      <div className="page">
        <div className="container">
          <h1 className="page-title">Checkout</h1>
          <div className="checkout-container">
            <div className="checkout-items">
              <h2 className="checkout-section-items">Order Summary</h2>
              {cartItemsDetails?.map((item, index) => 
                (
                  <div className="checkout-item" key={index}>
                    <img className="checkout-item-image" src={item.image} alt={item.name}></img>
                    <div className="checkout-item-details">
                      <h3 className="checkout-item-name">{item.name}</h3>
                      <p className="checkout-item-price">${item.price} each</p>
                    </div>
                    <div className="checkout-item-controls">
                      <div className="quantity-controls">
                        <button className="quantity-btn" onClick={()=>updateQuantity(item.id, "minus")}>-</button>
                        <span className="quantity-value">{item.quantity}</span>
                        <button className="quantity-btn" onClick={()=>updateQuantity(item.id, "plus")}>+</button>
                      </div>
                      <p className="checkout-item-total">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                )
              )}
            </div>
            
            <div></div>
          </div>
        </div>
      </div>


    </>
  );
}
export default CheckoutPage;
