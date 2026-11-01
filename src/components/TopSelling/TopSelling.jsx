
import { useState, useEffect } from "react";
import "./TopSelling.css";
import { getProducts } from "../../services/productService";
import ProductCard from "../ProductCard/ProductCard";

const TopSelling = () => {
  const [showAll, setShowAll] = useState(false);
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

  const visibleProducts = showAll
    ? products
    : products.slice(0, 4);

  return (
    <section className="top-selling">
      <h2>TOP SELLING</h2>

      {loading && <p>Loading products...</p>}

      {error && <p>{error}</p>}

      {!loading && !error && products.length === 0 && (
        <p>Abhi koi product available nahi hai.</p>
      )}

      <div className="products-grid">
        {visibleProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
          />
        ))}
      </div>

      {!loading && products.length > 4 && !showAll && (
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
