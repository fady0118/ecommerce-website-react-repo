import { getProducts } from "../data/products.js";
import Product from "../components/Product.jsx"
import { Link } from "react-router-dom";

function HomePage() {
  const products = getProducts();
  return (
    <>
      <div className="page">
        <div className="home-hero">
          <h1 className="home-title">Welcome to ShopHub</h1>
          <p className="home-subtite">Discover amazing products at great prices</p>
          <div className="container">
            <h2 className="page-title">Our Products</h2>
            <div className="product-grid">
              {products.map((product) => (
                <Product product={product} key={product.id}/>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default HomePage;
