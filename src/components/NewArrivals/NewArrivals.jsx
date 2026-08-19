import { useState } from "react";
import "./NewArrivals.css";
import Products from "../../data/Products";
import ProductCard from "../ProductCard/ProductCard";

const NewArrivals = () => {
  const [showAll, setShowAll] = useState(false);

  const visibleProducts = showAll
    ? products
    : products.slice(0, 4);

  return (
    <section className="new-arrivals">
      <h2>NEW ARRIVALS</h2>

      <div className="products-grid">
        {visibleProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
          />
        ))}
      </div>

      {!showAll && (
        <button
          className="view-all-btn"
          onClick={() => setShowAll(true)}
        >
          View All
        </button>
      )}
    </section>
  );
};

export default NewArrivals;