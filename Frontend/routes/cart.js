const express = require("express");
const router = express.Router();
const {
  addItem,
  getCart,
  removeItem,
  placeOrder,
} = require("../controllers/cart");

router.get("/:id&:qty", addItem);

router.get("/", getCart);

router.get("/remove/:id&:qty", removeItem);

router.get("/order", placeOrder);
module.exports = router;
