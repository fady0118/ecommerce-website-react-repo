import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { user, logout } = useAuth();

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
        {user?.email ? (
          <div className="navbar-auth">
            <p className="navbar-auth-links">
              <p>Hello, {user?.email}</p>
              <button className="btn btn-secondary" onClick={logout}>
                Logout
              </button>
            </p>
          </div>
        ) : (
          <div className="navbar-auth">
            <div className="navbar-auth-links">
              <Link className="btn btn-secondary" to="/auth/login">
                Login
              </Link>
              <Link className="btn btn-primary" to="/auth/signup">
                Signup
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
export default Navbar;
