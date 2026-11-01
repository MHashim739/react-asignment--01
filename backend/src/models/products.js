
const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    price: {
      type: Number,
      required: true,
    },

    image: {
      type: String,
      required: true,
    },

    rating: {
      type: Number,
      default: 0,
    },

    oldPrice: {
      type: Number,
    },

    discount: {
      type: Number,
    },

    category: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
