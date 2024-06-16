const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: String,
  title: String,
  tagline: String,
  price: Number,
  type: String,
  company: String,
  color: String,
  description: Array,
  rating: Number,
  ratingCount: Number,
  isFeatured: Boolean,
  isAvailable: Boolean,
  images: Array,
});

module.exports = mongoose.model("Product", productSchema);
