const express = require("express");
const router = express.Router();

const {
  createOrder,
  getAllOrders,
  updateOrderStatus,
  getDashboardStats,
  getAllCustomers,
} = require("../controllers/orderController");

const {
  protect,
  adminOnly,
} = require("../middleware/authMiddleware");

// Customer: Place Order
router.post("/", createOrder);

// Admin: Get Dashboard Stats
router.get("/stats", protect, adminOnly, getDashboardStats);

// Admin: Get All Customers
router.get("/customers", protect, adminOnly, getAllCustomers);

// Admin: Get All Orders
router.get("/", protect, adminOnly, getAllOrders);

// Admin: Update Order Status
router.put("/:id/status", protect, adminOnly, updateOrderStatus);

module.exports = router;