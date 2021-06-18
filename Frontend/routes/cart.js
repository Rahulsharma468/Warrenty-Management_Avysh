const express = require("express");
const router = express.Router();
const session = require("express-session")
const { addItem, getCart, removeItem } = require("../controllers/cart");

router.get("/:id", addItem);

router.get("/", getCart);

router.get("/remove/:id", removeItem);

module.exports = router;
