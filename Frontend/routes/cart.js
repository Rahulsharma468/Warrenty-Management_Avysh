const express = require("express");
const router = express.Router();
const { addItem, getCart, removeItem } = require("../controllers/cart");

router.get("/:id", addItem);

router.get("/", getCart);

router.get("/remove/:id", removeItem);

module.exports = router;
