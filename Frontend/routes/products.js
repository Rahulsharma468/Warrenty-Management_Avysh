const express = require("express");
const router = express.Router();

const { get_all_products, get_one } = require("../controllers/products");

router.get("/all", get_all_products);

router.get("/:prodId", get_one);

module.exports = router;