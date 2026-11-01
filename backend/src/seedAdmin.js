require("dotenv").config();

const bcrypt = require("bcryptjs");
const connectDB = require("./config/db");
const User = require("./models/User");

const createAdmin = async () => {
  try {
    if (!process.env.ADMIN_EMAIL || !process.env.ADMIN_PASSWORD) {
      throw new Error("ADMIN_EMAIL or ADMIN_PASSWORD is missing");
    }

    await connectDB();

    const email = process.env.ADMIN_EMAIL.trim().toLowerCase();

    const existingAdmin = await User.findOne({ email });

    if (existingAdmin) {
      console.log("This email is already registered. No changes made.");
      process.exit(0);
    }

    const hashedPassword = await bcrypt.hash(
      process.env.ADMIN_PASSWORD,
      12
    );

    await User.create({
      name: "Shop.CO Admin",
      email,
      password: hashedPassword,
      role: "admin",
    });

    console.log("Admin account created successfully!");
    process.exit(0);
  } catch (error) {
    console.error("Admin creation failed:", error.message);
    process.exit(1);
  }
};

createAdmin();