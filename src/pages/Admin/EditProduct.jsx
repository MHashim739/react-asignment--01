
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  getProductById,
  updateProduct,
} from "../../services/productService";
import "./EditProduct.css";

function EditProduct() {
  const { id } = useParams();
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

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const product = await getProductById(id);

        setFormData({
          name: product.name || "",
          price: product.price ?? "",
          image: product.image || "",
          category: product.category || "",
          rating: product.rating ?? "",
          oldPrice: product.oldPrice ?? "",
          discount: product.discount ?? "",
          description: product.description || "",
        });
      } catch (err) {
        setError(err.message || "Product load nahi ho saka.");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

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
    setSaving(true);

    try {
      const productData = {
        ...formData,
        price: Number(formData.price),
        rating: formData.rating === "" ? 0 : Number(formData.rating),
        oldPrice:
          formData.oldPrice === "" ? undefined : Number(formData.oldPrice),
        discount:
          formData.discount === "" ? undefined : Number(formData.discount),
      };

      await updateProduct(id, productData);
      alert("Product updated successfully!");
      navigate("/admin/dashboard");
    } catch (err) {
      setError(err.message || "Product update nahi ho saka.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p>Loading product...</p>;

  return (
    <div className="edit-product-page">
      <div className="edit-product-card">
        <div className="edit-product-heading">
          <h1>Edit Product</h1>
          <p>Update your product details below.</p>
        </div>

        {error && <p className="edit-error">{error}</p>}

        {!error && (
          <form onSubmit={handleSubmit}>
            <div className="edit-form-group">
              <label>Product Name *</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="edit-form-row">
              <div className="edit-form-group">
                <label>Price ($) *</label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  min="0"
                  step="0.01"
                  required
                />
              </div>

              <div className="edit-form-group">
                <label>Category *</label>
                <input
                  type="text"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="edit-form-group">
              <label>Product Image URL *</label>
              <input
                type="url"
                name="image"
                value={formData.image}
                onChange={handleChange}
                required
              />
            </div>

            <div className="edit-form-row">
              <div className="edit-form-group">
                <label>Rating</label>
                <input
                  type="number"
                  name="rating"
                  value={formData.rating}
                  onChange={handleChange}
                  min="0"
                  max="5"
                  step="0.1"
                />
              </div>

              <div className="edit-form-group">
                <label>Old Price ($)</label>
                <input
                  type="number"
                  name="oldPrice"
                  value={formData.oldPrice}
                  onChange={handleChange}
                  min="0"
                  step="0.01"
                />
              </div>
            </div>

            <div className="edit-form-group">
              <label>Discount (%)</label>
              <input
                type="number"
                name="discount"
                value={formData.discount}
                onChange={handleChange}
                min="0"
                max="100"
              />
            </div>

            <div className="edit-form-group">
              <label>Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="4"
              />
            </div>

            <div className="edit-form-actions">
              <button
                type="button"
                className="edit-cancel-btn"
                onClick={() => navigate("/admin/dashboard")}
              >
                Cancel
              </button>

              <button type="submit" disabled={saving}>
                {saving ? "Saving..." : "Update Product"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default EditProduct;
