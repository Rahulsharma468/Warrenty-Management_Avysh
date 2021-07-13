const express = require("express");
const { ensureAuthenticated } = require("../config/auth");
const router = express.Router();
const {
    addItem,
    getCart,
    removeItem,
    placeOrder,
} = require("../controllers/cart");

router.get("/:id&:qty", ensureAuthenticated, addItem);

router.get("/", ensureAuthenticated, getCart);

router.get("/remove/:id&:qty", removeItem);

router.get("/order", ensureAuthenticated, placeOrder);
module.exports = router;