import { Link } from "react-router-dom";
const Product = ({ product }) => {
  return (
    <div className="product-card" key={product.id}>
      <img className="product-card-image" src={product.image} />
      <div className="product-ard-content">
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
