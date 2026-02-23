import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import { getProductById, getProducts } from "../data/products";

function CheckoutPage() {
  const {user} = useAuth()
  const { cartItems, updateCartItemsState } = useCart(); // [currentUser:{id:2, quantity:4},{...}] -> { id, image, name, description, price, quantity, total_price }

  if(!user){
    return (
      <>
       <h1>User not logged in</h1>
       <Link to="/auth/login" style={{fontSize:"3rem"}}>login</Link>
      </>
    )
  }

  if(!cartItems[user.email]){
    updateCartItemsState()
  }
  // we need to grab each item details from the data/products.js
  const cartItemsDetails = cartItems[user.email]?.map(item=>{
    const itemDetails =  getProductById(item.id);
    itemDetails.quantity = item.quantity;
    return itemDetails
  }); // { id, image, name, description, price, quantity }
  console.log({cartItemsDetails})

  return (
    <>
      <h1>CheckoutPage</h1>
        {cartItemsDetails?.map((item,index)=>{
          return(
            <div key={index}>
              <h2>{item.name}</h2>
              <img src={item.image}></img>
              <p>Price: ${item.price*item.quantity}</p>
            </div>
          )
        })}
    </>
  );
}
export default CheckoutPage;
