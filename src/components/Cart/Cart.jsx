import { Link, useParams } from "react-router-dom";

import { useState } from "react";
import "./Cart.css";
// import Newsletter from "../Newsletter/Newsletter";
// import Footer from "../Footer/Footer";

const Cart = () => {
  const [cart, setCart] = useState(
    JSON.parse(localStorage.getItem("cart")) || []
    
  );
  

  const removeFromCart = (id) => {
    const updatedCart = cart.filter(
      (item) => item.id !== id
    );

    setCart(updatedCart);

    localStorage.setItem(
      "cart",
      JSON.stringify(updatedCart)
    );
  };

  if (cart.length === 0) {
    return (
        
      <section className="cart-page">
        <div className="cart-page-nav">
  <Link to="/">Home</Link>
</div>
        <h1>Your Cart</h1>
        <p>Your cart is empty.</p>
      </section>
    );
  }

  return (
    <section className="cart-page">
      <h1>Your Cart</h1>

      <div className="cart-container">
        {cart.map((item) => (
          <div className="cart-item" key={item.id}>
            
            <img
              src={item.image}
              alt={item.name}
            />

            <div className="cart-item-info">
              <h2>{item.name}</h2>
              <p>${item.price}</p>

              <button
                onClick={() => removeFromCart(item.id)}
              >
                Delete
              </button>
            </div>

          </div>
        ))}
        
      </div>
        
    </section>
    
    
  );
  
};

export default Cart;