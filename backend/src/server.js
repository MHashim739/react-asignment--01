
const express = require("express");
const cors = require("cors");
const productRoutes = require("./routes/productRoutes");
const cookieParser = require("cookie-parser");
const authRoutes = require("./routes/authRoutes");
const orderRoutes = require("./routes/orderRoutes");

require("dotenv").config();

const connectDB = require("./config/db");

const app = express();
// app.use((req, res, next) => {
//   console.log("REQUEST RECEIVED:", req.method, req.url);
//   next();
// });

// Middleware
app.use(
  cors({
    origin: "http://localhost:5178",
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

// Request Logge

// Product Routes
app.use("/api/products", productRoutes);
// Authentication Routes
app.use("/api/auth", authRoutes);
// Order Routes
app.use("/api/orders", orderRoutes);
app.get("/api/auth/direct-test", (req, res) => {
  res.json({
    success: true,
    message: "DIRECT AUTH TEST WORKING!"
  });
});
console.log("AUTH ROUTES MOUNTED!");
console.log("AUTH ROUTES:", authRoutes.stack.map(route => ({
  path: route.route.path,
  methods: route.route.methods
})));

// Test Route
app.get("/test", (req, res) => {
  res.json({
    success: true,
    message: "Test Route Working!",
  });
});

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Server failed to start:", error.message);
  }
};

startServer();
