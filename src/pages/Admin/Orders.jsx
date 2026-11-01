
import { useEffect, useState } from "react";
import "./Orders.css";
import API_URL from "../../services/api";
function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [updatingId, setUpdatingId] = useState(null);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(`${API_URL}/api/orders`, {
        method: "GET",
        credentials: "include",
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Failed to fetch orders");
      }

      setOrders(data.orders);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleStatusChange = (id, newStatus) => {
    setOrders((previousOrders) =>
      previousOrders.map((order) =>
        order._id === id
          ? { ...order, orderStatus: newStatus }
          : order
      )
    );
  };

  const updateStatus = async (id, orderStatus) => {
    try {
      setUpdatingId(id);

      const response = await fetch(
        `${API_URL}/api/orders/${id}/status`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ orderStatus }),
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Status update failed");
      }

      alert("Order status updated successfully!");
      await fetchOrders();
    } catch (err) {
      alert(err.message);
      await fetchOrders();
    } finally {
      setUpdatingId(null);
    }
  };

  if (loading) {
    return <h2 className="orders-message">Loading orders...</h2>;
  }

  if (error) {
    return <h2 className="orders-message">{error}</h2>;
  }

  return (
    <div className="orders-page">
      <div className="orders-heading">
        <div>
          <h1>Orders Management</h1>
          <p>Manage and track your customer orders.</p>
        </div>

        <button onClick={fetchOrders}>Refresh Orders</button>
      </div>

      <div className="orders-summary">
        <div className="orders-summary-card">
          <h3>Total Orders</h3>
          <h2>{orders.length}</h2>
        </div>

        <div className="orders-summary-card">
          <h3>Pending Orders</h3>
          <h2>
            {orders.filter((order) => order.orderStatus === "Pending").length}
          </h2>
        </div>

        <div className="orders-summary-card">
          <h3>Delivered Orders</h3>
          <h2>
            {orders.filter((order) => order.orderStatus === "Delivered").length}
          </h2>
        </div>
      </div>

      {orders.length === 0 ? (
        <div className="empty-orders">
          <h2>No Orders Found</h2>
          <p>Customer orders will appear here.</p>
        </div>
      ) : (
        <div className="orders-list">
          {orders.map((order) => (
            <div className="order-card" key={order._id}>
              <div className="order-card-header">
                <div>
                  <h3>Order #{order._id.slice(-8)}</h3>
                  <p>{new Date(order.createdAt).toLocaleDateString()}</p>
                </div>

                <span className={`order-status ${order.orderStatus.toLowerCase()}`}>
                  {order.orderStatus}
                </span>
              </div>

              <div className="order-customer">
                <h4>Customer Details</h4>
                <p><strong>Name:</strong> {order.customerName}</p>
                <p><strong>Email:</strong> {order.customerEmail}</p>
                <p><strong>Phone:</strong> {order.customerPhone}</p>
                <p><strong>Address:</strong> {order.shippingAddress}</p>
              </div>

              <div className="order-products">
                <h4>Products</h4>

                {order.items.map((item) => (
                  <div className="order-product" key={item._id}>
                    <img src={item.image} alt={item.name} />

                    <div>
                      <h4>{item.name}</h4>
                      <p>Price: ${item.price}</p>
                      <p>Quantity: {item.quantity}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="order-footer">
                <div>
                  <p><strong>Total:</strong> ${order.totalAmount}</p>
                  <p><strong>Payment:</strong> {order.paymentMethod}</p>
                  <p><strong>Payment Status:</strong> {order.paymentStatus}</p>
                </div>

                <div className="order-status-control">
                  <select
                    value={order.orderStatus}
                    onChange={(e) =>
                      handleStatusChange(order._id, e.target.value)
                    }
                  >
                    <option value="Pending">Pending</option>
                    <option value="Processing">Processing</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>

                  <button
                    onClick={() =>
                      updateStatus(order._id, order.orderStatus)
                    }
                    disabled={updatingId === order._id}
                  >
                    {updatingId === order._id ? "Updating..." : "Update Status"}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Orders;
