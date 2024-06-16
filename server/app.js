const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

dotenv.config();

const authRoutes = require("./routes/auth");
const productRoutes = require("./routes/product");
const cartRoutes = require("./routes/cart");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);

app.get("/api/filter-options", async (req, res) => {
  try {
    console.log("filter-options route hit"); // This log should appear
    const colors = await Product.distinct("color");
    const types = await Product.distinct("type");
    const companies = await Product.distinct("company");
    const price = [
      "₹0 - ₹1,000",
      "₹1,000 - ₹5,000",
      "₹5,000 - ₹10,000",
      "₹10,000+",
    ];

    res.json([
      { id: "type", displayText: "Category", items: types },
      { id: "company", displayText: "Company", items: companies },
      { id: "color", displayText: "Colour", items: colors },
      { id: "price", displayText: "Price", items: price },
    ]);
  } catch (error) {
    console.error("Error occurred while fetching filter options:", error);
    res.status(500).json({ status: "FAIL", message: "Internal server error" });
  }
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ status: "ERROR", message: "Internal server error" });
});

module.exports = app;
