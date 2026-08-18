import { Link } from "react-router-dom";
import "./ProductCard.css";
// import Newsletter from "../Newsletter/Newsletter";
// import Footer from "../Footer/Footer";

const ProductCard = ({ product }) => {
  return (
    <Link
      to={`/product/${product.id}`}
      className="product-card-link"
    >
      <div className="product-card">

        <div className="product-image">
          <img src={product.image} alt={product.name} />
        </div>

        <h3>{product.name}</h3>

        <div className="product-rating">
          <span>★★★★★</span>
          <span>{product.rating}/5</span>
        </div>

        <div className="product-price">
          <span>${product.price}</span>

          {product.oldPrice && (
            <span className="old-price">
              ${product.oldPrice}
            </span>
          )}

          {product.discount && (
            <span className="discount">
              {product.discount}
            </span>
          )}
        </div>

      </div>
    </Link>
    
  );
 
};

export default ProductCard;