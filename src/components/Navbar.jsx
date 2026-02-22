import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function Navbar() {
  const { user, logout } = useContext(AuthContext);

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
            <div className="navbar-auth-links">
              <div>{user?.email}</div>
              <button className="btn btn-secondary" onClick={logout}>
                Logout
              </button>
            </div>
          </div>
        ) : (
          <div className="navbar-auth">
            <div className="navbar-auth-links">
              <Link className="btn btn-secondary" to="/auth">
                Login
              </Link>
              <Link className="btn btn-primary" to="/auth">
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
