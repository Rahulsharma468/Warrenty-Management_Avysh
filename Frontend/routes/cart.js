const express = require("express");
const router = express.Router();
const { addItem, getCart, removeItem } = require("../controllers/cart");

router.get("/:id&:qty", addItem);

router.get("/", getCart);

router.get("/remove/:id&:qty", removeItem);

module.exports = router;
