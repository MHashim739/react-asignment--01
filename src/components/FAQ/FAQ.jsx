import "./FAQ.css";

const FAQ = () => {
  return (
    <div className="faq-section">

      <div className="faq-item">
        <h3>What materials are used in this product?</h3>
        <p>
          This product is made with high-quality materials designed
          for comfort, durability, and everyday use.
        </p>
      </div>

      <div className="faq-item">
        <h3>Is this product suitable for everyday use?</h3>
        <p>
          Yes, it is designed to provide comfort and durability for
          regular everyday use.
        </p>
      </div>

      <div className="faq-item">
        <h3>How can I place an order?</h3>
        <p>
          Select your preferred product and add it to your cart.
          You can then proceed to checkout.
        </p>
      </div>

      <div className="faq-item">
        <h3>Can I return the product?</h3>
        <p>
          Yes, products can be returned according to the return
          policy of the store.
        </p>
      </div>

    </div>
  );
};

export default FAQ;