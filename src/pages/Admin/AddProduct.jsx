
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addProduct } from "../../services/productService";
import "./AddProduct.css";

function AddProduct() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    image: "",
    category: "",
    rating: "",
    oldPrice: "",
    discount: "",
    description: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    setLoading(true);

    try {
      const productData = {
        ...formData,
        price: Number(formData.price),
        rating: formData.rating ? Number(formData.rating) : 0,
        oldPrice: formData.oldPrice ? Number(formData.oldPrice) : undefined,
        discount: formData.discount ? Number(formData.discount) : undefined,
      };

      await addProduct(productData);

      setSuccess("Product added successfully!");

      setTimeout(() => {
        navigate("/admin/dashboard");
      }, 1000);
    } catch (err) {
      setError(err.message || "Failed to add product.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-product-page">
      <div className="add-product-card">
        <div className="add-product-heading">
          <h1>Add New Product</h1>
          <p>Enter the details of your new store product.</p>
        </div>

        {error && <p className="form-error">{error}</p>}
        {success && <p className="form-success">{success}</p>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Product Name *</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter product name"
              required
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Price ($) *</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="Enter price"
                min="0"
                step="0.01"
                required
              />
            </div>

            <div className="form-group">
              <label>Category *</label>
              <input
                type="text"
                name="category"
                value={formData.category}
                onChange={handleChange}
                placeholder="e.g. T-shirts"
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label>Product Image URL *</label>
            <input
              type="url"
              name="image"
              value={formData.image}
              onChange={handleChange}
              placeholder="https://example.com/image.jpg"
              required
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Rating</label>
              <input
                type="number"
                name="rating"
                value={formData.rating}
                onChange={handleChange}
                placeholder="e.g. 4.5"
                min="0"
                max="5"
                step="0.1"
              />
            </div>

            <div className="form-group">
              <label>Old Price ($)</label>
              <input
                type="number"
                name="oldPrice"
                value={formData.oldPrice}
                onChange={handleChange}
                placeholder="Enter old price"
                min="0"
                step="0.01"
              />
            </div>
          </div>

          <div className="form-group">
            <label>Discount (%)</label>
            <input
              type="number"
              name="discount"
              value={formData.discount}
              onChange={handleChange}
              placeholder="e.g. 20"
              min="0"
              max="100"
            />
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Write product description..."
              rows="4"
            />
          </div>

          <div className="form-actions">
            <button
              type="button"
              className="cancel-btn"
              onClick={() => navigate("/admin/dashboard")}
            >
              Cancel
            </button>

            <button type="submit" disabled={loading}>
              {loading ? "Adding Product..." : "Add Product"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddProduct;
