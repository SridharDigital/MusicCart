const express = require("express");
const Product = require("../models/Product");

const router = express.Router();

router.get("/", async (req, res) => {
  const {
    isAvailable,
    rating,
    company,
    color,
    type,
    price,
    title,
    search,
    sortBy,
  } = req.query;

  const displayConditions = {
    isAvailable,
    rating: { $gt: rating },
    price: { $gt: price.min, $lt: price.max },
  };

  if (company) displayConditions["company"] = company;
  if (type) displayConditions["type"] = type;
  if (color) displayConditions["color"] = color;
  if (title) displayConditions["title"] = { $regex: new RegExp(title, "i") };

  const collation = { locale: "en", strength: 2 };
  try {
    const products = await Product.find(displayConditions)
      .collation(collation)
      .sort(sortBy);
    const productsList = products.map((eachProduct) => ({
      id: eachProduct._id,
      name: eachProduct.name,
      price: eachProduct.price,
      color: eachProduct.color,
      type: eachProduct.type,
      title: eachProduct.title,
      featuredImage: eachProduct.images[0],
    }));
    res.json(productsList);
  } catch (error) {
    res.status(500).json({ status: "FAIL", message: "Internal server error" });
  }
});

router.get("/filter-options", async (req, res) => {
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

router.get("/details/:id", async (req, res) => {
  console.log("executed");
  const { id } = req.params;
  try {
    const productDetails = await Product.findById(id);
    res.json(productDetails);
  } catch (error) {
    res.status(500).json({ status: "FAIL", message: "Internal server error" });
  }
});

module.exports = router;

module.exports = router;
