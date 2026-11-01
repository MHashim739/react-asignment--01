
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getProducts } from "../../services/productService";
import ProductCard from "../../components/ProductCard/ProductCard";
import "./Filter.css";

const Filter = () => {
  const [maxPrice, setMaxPrice] = useState(200);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();

        const formattedProducts = data.map((product) => ({
          ...product,
          id: product._id,
          discount: product.discount
            ? `-${product.discount}%`
            : "",
        }));

        setProducts(formattedProducts);
      } catch (error) {
        setError("Products load nahi ho sake.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

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
              <button className="selected-size">Large</button>
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

        <div className="filtered-products">
          <div className="products-heading">
            <h2>Products</h2>
            <span>{filteredProducts.length} Products</span>
          </div>

          {loading && <p>Loading products...</p>}

          {error && <p>{error}</p>}

          {!loading && !error && filteredProducts.length === 0 && (
            <p>No products found.</p>
          )}

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
