
import { useEffect, useState } from "react";
import "./Customers.css";

const API_URL = "http://localhost:5000/api/orders/customers";

function Customers() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchCustomers = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(API_URL, {
        method: "GET",
        credentials: "include",
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Failed to load customers");
      }

      setCustomers(data.customers);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  const totalOrders = customers.reduce(
    (total, customer) => total + customer.totalOrders,
    0
  );

  const totalRevenue = customers.reduce(
    (total, customer) => total + customer.totalPurchaseAmount,
    0
  );

  return (
    <div className="customers-page">
      <div className="customers-heading">
        <div>
          <h1>Customers Management</h1>
          <p>View and manage your store customers.</p>
        </div>

        <button onClick={fetchCustomers}>
          Refresh Customers
        </button>
      </div>

      <div className="customers-summary">
        <div className="customers-summary-card">
          <h3>Total Customers</h3>
          <h2>{customers.length}</h2>
        </div>

        <div className="customers-summary-card">
          <h3>Total Orders</h3>
          <h2>{totalOrders}</h2>
        </div>

        <div className="customers-summary-card">
          <h3>Total Revenue</h3>
          <h2>${totalRevenue}</h2>
        </div>
      </div>

      {loading && <p>Loading customers...</p>}

      {error && (
        <p className="customers-error">{error}</p>
      )}

      {!loading && !error && (
        <div className="customers-table-wrapper">
          {customers.length === 0 ? (
            <div className="empty-customers">
              <h2>No Customers Found</h2>
              <p>Customers will appear here after placing orders.</p>
            </div>
          ) : (
            <table className="customers-table">
              <thead>
                <tr>
                  <th>Customer Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Total Orders</th>
                  <th>Total Purchase</th>
                  <th>Last Order</th>
                </tr>
              </thead>

              <tbody>
                {customers.map((customer) => (
                  <tr key={customer._id}>
                    <td>{customer.customerName}</td>
                    <td>{customer.customerEmail}</td>
                    <td>{customer.customerPhone}</td>
                    <td>{customer.totalOrders}</td>
                    <td>${customer.totalPurchaseAmount}</td>
                    <td>
                      {new Date(
                        customer.lastOrderDate
                      ).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
}

export default Customers;
