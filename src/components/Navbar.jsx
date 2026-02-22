import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-brand">
          ShopHub
        </Link>
        <div className="navbar-links">
          <Link className="navbar-link" to={"/"}>
            Home
          </Link>
          <Link className="navbar-link" to={"/checkout"}>
            Cart
          </Link>
        </div>
        <div className="navbar-auth">
          <div className="navbar-auth-links" to={"/auth"}>
            <Link className="btn btn-secondary" to="/auth">
              Login
            </Link>
            <Link className="btn btn-primary" to="/auth">
              Signup
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
export default Navbar;
