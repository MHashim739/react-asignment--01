
import "./Navbar.css";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar">
      <Link to="/" className="navbar-logo">
        SHOP.CO
      </Link>

      <ul className="navbar-links">
        <li><a href="#">Shop</a></li>
        <li><a href="#">On Sale</a></li>
        <li><a href="#">New Arrivals</a></li>
        <li><a href="#">Brands</a></li>
      </ul>

      <div className="navbar-search">
        <span>⌕</span>
        <input
          type="text"
          placeholder="Search for products..."
        />
      </div>

      <div className="navbar-icons">
        <Link to="/cart" aria-label="Cart">🛒</Link>
        <Link to="/login" className="admin-login-link">
          Admin Login
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
