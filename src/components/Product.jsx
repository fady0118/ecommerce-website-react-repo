import { Link } from "react-router-dom";
const Product = ({ product }) => {
  return (
    <div className="product-card">
      <img className="product-card-image" src={product.image} alt={product.name}/>
      <div className="product-card-content">
        <h3 className="product-card-name">{product.name}</h3>
        <p className="product-card-price">{product.price}</p>
        <div className="product-card-actions">
          <Link className="btn btn-secondary">View Details</Link>
          <button className="btn btn-primary">Add to cart</button>
        </div>
      </div>
    </div>
  );
};

export default Product;
