const express = require("express");
const UserCartItem = require("../models/UserCartItem");
const Product = require("../models/Product");
const verifyAuthentication = require("../middleware/auth");

const router = express.Router();

router.get("/", verifyAuthentication, async (req, res) => {
  const { userId } = req.query;
  try {
    const userCart = await UserCartItem.findOne({ userId });
    if (!userCart) {
      return res.status(404).json({
        status: "FAIL",
        message: "Cart not found",
      });
    }

    const query = { _id: { $in: userCart.cartItems } };
    const products = await Product.find(query);
    const productsList = products.map((eachProduct) => ({
      id: eachProduct._id,
      name: eachProduct.name,
      price: eachProduct.price,
      color: eachProduct.color,
      type: eachProduct.type,
      isAvailable: eachProduct.isAvailable,
      featuredImage: eachProduct.images[0],
      quantity: 1,
    }));

    res.json(productsList);
  } catch (error) {
    res.status(500).json({ status: "FAIL", message: "Internal server error" });
  }
});

router.post("/", verifyAuthentication, async (req, res) => {
  try {
    const { userId, productId } = req.body;
    const userCart = await UserCartItem.findOne({ userId });

    if (userCart) {
      await UserCartItem.updateOne(
        { userId },
        { $push: { cartItems: productId } }
      );
    } else {
      await UserCartItem.create({ userId, cartItems: [productId] });
    }

    res.json({ message: "Product added successfully" });
  } catch (error) {
    res.status(500).json({ status: "FAIL", message: "Internal server error" });
  }
});

module.exports = router;
