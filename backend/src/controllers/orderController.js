const Order = require("../models/Order");
const Product = require("../models/products");
// CREATE ORDER
const createOrder = async (req, res) => {
  try {
    const {
      customerName,
      customerEmail,
      customerPhone,
      shippingAddress,
      items,
    } = req.body;

    if (
      !customerName ||
      !customerEmail ||
      !customerPhone ||
      !shippingAddress ||
      !Array.isArray(items) ||
      items.length === 0
    ) {
      return res.status(400).json({
        success: false,
        message: "Please provide all required order details.",
      });
    }

    const orderItems = [];
    let totalAmount = 0;

    for (const item of items) {
      if (!item.id) {
        return res.status(400).json({
          success: false,
          message: "Invalid product information.",
        });
      }

      const product = await Product.findById(item.id);

      if (!product) {
        return res.status(404).json({
          success: false,
          message: "A product in your cart was not found.",
        });
      }

      const quantity = 1;

      orderItems.push({
        product: product._id,
        name: product.name,
        image: product.image,
        price: product.price,
        quantity,
      });

      totalAmount += product.price * quantity;
    }

    const order = await Order.create({
      customerName,
      customerEmail,
      customerPhone,
      shippingAddress,
      items: orderItems,
      totalAmount,
    });

    res.status(201).json({
      success: true,
      message: "Order placed successfully!",
      order,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// GET ALL ORDERS (ADMIN)
const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      orders,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// GET DASHBOARD STATS (ADMIN)
const getDashboardStats = async (req, res) => {
  try {
    const totalOrders = await Order.countDocuments();

    const uniqueCustomers = await Order.distinct("customerEmail");

    res.status(200).json({
      success: true,
      stats: {
        totalOrders,
        totalCustomers: uniqueCustomers.length,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


 // GET ALL CUSTOMERS (ADMIN)
const getAllCustomers = async (req, res) => {
  try {
    const customers = await Order.aggregate([
      {
        $sort: { createdAt: -1 },
      },
      {
        $group: {
          _id: "$customerEmail",
          customerName: { $first: "$customerName" },
          customerEmail: { $first: "$customerEmail" },
          customerPhone: { $first: "$customerPhone" },
          totalOrders: { $sum: 1 },
          totalPurchaseAmount: { $sum: "$totalAmount" },
          lastOrderDate: { $first: "$createdAt" },
        },
      },
      {
        $sort: { lastOrderDate: -1 },
      },
    ]);

    res.status(200).json({
      success: true,
      totalCustomers: customers.length,
      customers,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};



// UPDATE ORDER STATUS (ADMIN)
const updateOrderStatus = async (req, res) => {
  try {
    const { orderStatus } = req.body;

    const allowedStatuses = [
      "Pending",
      "Processing",
      "Shipped",
      "Delivered",
      "Cancelled",
    ];

    if (!allowedStatuses.includes(orderStatus)) {
      return res.status(400).json({
        success: false,
        message: "Invalid order status.",
      });
    }

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { orderStatus },
      { new: true, runValidators: true }
    );

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Order status updated successfully!",
      order,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createOrder,
  getAllOrders,
  updateOrderStatus,
  getDashboardStats,
  getAllCustomers,
};