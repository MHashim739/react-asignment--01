
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import "./ProductDetail.css";
import { getProductById } from "../../services/productService";
import ProductInfo from "../../components/ProductInfo/ProductInfo";

const ProductDetail = () => {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await getProductById(id);

        setProduct({
          ...data,
          id: data._id,
          discount: data.discount
            ? `-${data.discount}%`
            : "",
        });
      } catch (error) {
        setError("Product not found");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    const alreadyInCart = cart.find(
      (item) => item.id === product.id
    );

    if (alreadyInCart) {
      alert("Product already added to cart!");
      return;
    }

    cart.push(product);

    localStorage.setItem("cart", JSON.stringify(cart));

    alert("Product added to cart!");
  };

  if (loading) {
    return <h2>Loading product...</h2>;
  }

  if (error || !product) {
    return <h2>Product not found</h2>;
  }

  return (
    <>
      <div className="product-page-nav">
        <div className="product-page-nav-links">
          <Link to="/">Home</Link>
          <Link to="/cart">Cart</Link>
          <Link to="/filter">Filter</Link>
        </div>
      </div>

      <section className="product-detail">
        <div className="product-detail-image">
          <img src={product.image} alt={product.name} />
        </div>

        <div className="product-detail-content">
          <h1>{product.name}</h1>

          <div className="product-detail-rating">
            ★★★★★ {product.rating}/5
          </div>

          <div className="product-detail-price">
            <span>${product.price}</span>

            {product.oldPrice && (
              <span className="detail-old-price">
                ${product.oldPrice}
              </span>
            )}

            {product.discount && (
              <span className="detail-discount">
                {product.discount}
              </span>
            )}
          </div>

          <p>
            {product.description ||
              "This stylish product is designed with comfort and quality in mind."}
          </p>

          <button
            className="add-to-cart-btn"
            onClick={handleAddToCart}
          >
            Add to Cart
          </button>
        </div>
      </section>

      <ProductInfo />
    </>
  );
};

export default ProductDetail;
