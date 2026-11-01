
import { Link } from "react-router-dom";
import { useState } from "react";
import API_URL from "../../services/api";
import "./Cart.css";

// const API_URL = "http://localhost:5000/api/orders";

const Cart = () => {
  const [cart, setCart] = useState(
    JSON.parse(localStorage.getItem("cart")) || []
  );

  const [formData, setFormData] = useState({
    customerName: "",
    customerEmail: "",
    customerPhone: "",
    shippingAddress: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const removeFromCart = (id) => {
    const updatedCart = cart.filter((item) => item.id !== id);

    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const totalAmount = cart.reduce(
    (total, item) => total + Number(item.price),
    0
  );

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError("");
      setSuccess("");

     const response = await fetch(`${API_URL}/api/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          items: cart.map((item) => ({
            id: item.id,
          })),
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Order placement failed.");
      }

      setSuccess("Your order has been placed successfully!");

      setCart([]);
      localStorage.removeItem("cart");

      setFormData({
        customerName: "",
        customerEmail: "",
        customerPhone: "",
        shippingAddress: "",
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (cart.length === 0) {
    return (
      <section className="cart-page">
        <div className="cart-page-nav">
          <Link to="/">Home</Link>
        </div>

        <h1>Your Cart</h1>

        <p>Your cart is empty.</p>

        {success && <p>{success}</p>}
      </section>
    );
  }

  return (
    <section className="cart-page">
      <h1>Your Cart</h1>

      <div className="cart-container">
        {cart.map((item) => (
          <div className="cart-item" key={item.id}>
            <img src={item.image} alt={item.name} />

            <div className="cart-item-info">
              <h2>{item.name}</h2>
              <p>${item.price}</p>

              <button onClick={() => removeFromCart(item.id)}>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="checkout-section">
        <h2>Checkout Details</h2>

        <h3>Total Amount: ${totalAmount}</h3>

        <form onSubmit={handlePlaceOrder}>
          <input
            type="text"
            name="customerName"
            placeholder="Your Name"
            value={formData.customerName}
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="customerEmail"
            placeholder="Your Email"
            value={formData.customerEmail}
            onChange={handleChange}
            required
          />

          <input
            type="tel"
            name="customerPhone"
            placeholder="Your Phone Number"
            value={formData.customerPhone}
            onChange={handleChange}
            required
          />

          <textarea
            name="shippingAddress"
            placeholder="Your Shipping Address"
            value={formData.shippingAddress}
            onChange={handleChange}
            required
          />

          {error && <p className="checkout-error">{error}</p>}

          <button type="submit" disabled={loading}>
            {loading ? "Placing Order..." : "Place Order"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default Cart;
