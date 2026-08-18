import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">

      <div className="navbar-logo">
        SHOP.CO
      </div>

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
        <button aria-label="Cart">🛒</button>
        <button aria-label="User">👤</button>
      </div>

    </nav>
  );
};

export default Navbar;