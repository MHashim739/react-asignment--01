import { useState } from "react";
import "./TopSelling.css";
import products from "../../data/products";
import ProductCard from "../ProductCard/ProductCard";

const TopSelling = () => {
  const [showAll, setShowAll] = useState(false);

  const visibleProducts = showAll
    ? products
    : products.slice(0, 4);

  return (
    <section className="top-selling">
      <h2>TOP SELLING</h2>

      <div className="products-grid">
        {visibleProducts.map((products) => (
          <ProductCard
            key={products.id}
            product={products}
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

export default TopSelling;