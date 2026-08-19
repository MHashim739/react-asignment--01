import { useState } from "react";
import { Link } from "react-router-dom";
import products from "../../data/products";
import ProductCard from "../../components/ProductCard/ProductCard";
import "./Filter.css";

const Filter = () => {
  const [maxPrice, setMaxPrice] = useState(200);

  const filteredProducts = products.filter(
    (product) => product.price <= maxPrice
  );

  return (
    <section className="filter-page">

      <div className="filter-top">
        <Link to="/" className="filter-back">
          ←
        </Link>

        <h1>Filters</h1>

        <span></span>
      </div>

      <div className="filter-layout">

        {/* LEFT SIDE FILTER */}
        <aside className="filter-sidebar">

          <div className="filter-section">
            <h2>Categories</h2>

            <div className="category-options">
              <button>T-shirts</button>
              <button>Shorts</button>
              <button>Hoodies</button>
            </div>
          </div>

          <div className="filter-section">
            <div className="filter-title">
              <h2>Price</h2>
              <span>${maxPrice}</span>
            </div>

            <input
              type="range"
              min="50"
              max="300"
              value={maxPrice}
              onChange={(e) =>
                setMaxPrice(Number(e.target.value))
              }
              className="price-slider"
            />
          </div>

          <div className="filter-section">
            <h2>Colors</h2>

            <div className="color-options">
              <span className="color black"></span>
              <span className="color white"></span>
              <span className="color red"></span>
              <span className="color yellow"></span>
              <span className="color green"></span>
              <span className="color blue"></span>
              <span className="color purple"></span>
            </div>
          </div>

          <div className="filter-section">
            <h2>Size</h2>

            <div className="size-options">
              <button>Small</button>
              <button>Medium</button>
              <button className="selected-size">
                Large
              </button>
              <button>XL</button>
            </div>
          </div>

          <div className="filter-section">
            <h2>Dress Style</h2>

            <div className="dress-style-options">
              <button>Casual</button>
              <button>Formal</button>
              <button>Party</button>
              <button>Gym</button>
            </div>
          </div>

          <button className="apply-filter-btn">
            Apply Filter
          </button>

        </aside>

        {/* RIGHT SIDE PRODUCTS */}
        <div className="filtered-products">

          <div className="products-heading">
            <h2>Products</h2>
            <span>{filteredProducts.length} Products</span>
          </div>

          <div className="filter-product-grid">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
              />
            ))}
          </div>

        </div>

      </div>

    </section>
  );
};

export default Filter;