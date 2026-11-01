
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import API_URL from "../../services/api";
import "./AdminDashboard.css";

import {
  getProducts,
  deleteProduct,
} from "../../services/productService";

function AdminDashboard() {

  const { logout } = useAuth();
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [stats, setStats] = useState({
    totalOrders: 0,
    totalCustomers: 0,
  });

  const [statsLoading, setStatsLoading] = useState(true);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchProducts = async () => {
    try {
      setError("");
      const data = await getProducts();
      setProducts(data);
    } catch (err) {
      setError("Products load nahi ho sake. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchDashboardStats = async () => {
    try {
      const response = await fetch(
        `${API_URL}/api/orders/stats`,
        {
          method: "GET",
          credentials: "include",
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Stats load failed");
      }

      setStats(data.stats);
    } catch (err) {
      console.error("Dashboard stats error:", err);
    } finally {
      setStatsLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchDashboardStats();
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (err) {
      alert(err.message || "Logout failed. Please try again.");
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (!confirmDelete) return;

    try {
      await deleteProduct(id);
      await fetchProducts();
      alert("Product deleted successfully!");
    } catch (err) {
      alert(err.message || "Product delete failed");
    }
  };

  return (
    <div className="admin-dashboard">
      <aside className="admin-sidebar">
        <h2>SHOP.CO</h2>
        <p className="sidebar-label">ADMIN PANEL</p>

        <nav>
          <a className="active" href="/admin/dashboard">Dashboard</a>
          <a href="#products">Products</a>
          <a
            href="/admin/orders"
            onClick={(e) => {
              e.preventDefault();
              navigate("/admin/orders");
            }}
          >
            Orders
          </a>
          <a
            href="/admin/customers"
            onClick={(e) => {
              e.preventDefault();
              navigate("/admin/customers");
            }}
          >
            Customers
          </a>
        </nav>

        <div className="sidebar-bottom">
          <p>Shop.CO Admin</p>
          <span>Administrator</span>
        </div>
      </aside>

      <main className="admin-main">
        <header className="admin-header">
          <div>
            <h1>Dashboard</h1>
            <p>Welcome back! Here's what's happening with your store.</p>
          </div>

          <div className="admin-header-actions">
            <span className="admin-status">Admin</span>

            <button
              className="logout-btn"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>

        </header>

        <section className="admin-stats">
          <div className="stat-card">
            <p>Total Products</p>
            <h2>{products.length}</h2>
            <span>Products in your store</span>
          </div>

          <div className="stat-card">
            <p>Total Orders</p>
            <h2>{statsLoading ? "..." : stats.totalOrders}</h2>
            <span>Orders received</span>
          </div>

          <div className="stat-card">
            <p>Total Customers</p>
            <h2>{statsLoading ? "..." : stats.totalCustomers}</h2>
            <span>Registered customers</span>
          </div>

          <div className="stat-card">
            <p>Store Status</p>
            <h2 className="status-open">Active</h2>
            <span>Your store is running</span>
          </div>
        </section>

        <section className="admin-content" id="products">

          <div className="content-heading">
            <div>
              <h2>Product Management</h2>
              <p>Manage your store products from here.</p>
            </div>

            <button
              className="add-product-btn"
              onClick={() => navigate("/admin/add-product")}
            >
              + Add Product
            </button>
          </div>


          {loading && <p>Loading products...</p>}

          {error && <p style={{ color: "red" }}>{error}</p>}

          {!loading && !error && (
            <div className="products-table-wrapper">
              <table className="products-table">
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Category</th>
                    <th>Price</th>
                    <th>Rating</th>
                    <th>Action</th>
                  </tr>
                </thead>

                <tbody>
                  {products.map((product) => (
                    <tr key={product._id}>
                      <td>
                        <div className="admin-product">
                          <img
                            src={product.image}
                            alt={product.name}
                          />
                          <span>{product.name}</span>
                        </div>
                      </td>

                      <td>{product.category || "N/A"}</td>
                      <td>${product.price}</td>
                      <td>{product.rating || "N/A"}</td>


                      <td>
                        <div className="product-action-buttons">
                          <button
                            className="edit-product-btn"
                            onClick={() => navigate(`/admin/edit-product/${product._id}`)}
                          >
                            Edit
                          </button>

                          <button
                            className="delete-product-btn"
                            onClick={() => handleDelete(product._id)}
                          >
                            Delete
                          </button>
                        </div>
                      </td>

                    </tr>
                  ))}
                </tbody>
              </table>

              {products.length === 0 && (
                <p>No products found.</p>
              )}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

export default AdminDashboard;
