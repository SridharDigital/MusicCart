const mongoose = require("mongoose");

const userCartItemSchema = new mongoose.Schema({
  userId: String,
  cartItems: Array,
});

module.exports = mongoose.model("UserCartItem", userCartItemSchema);
