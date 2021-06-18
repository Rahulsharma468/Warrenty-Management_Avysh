const express = require("express");
const router = express.Router();
const { upload } = require("../controllers/helper");

const {
  renderProduct,
  handleProductsubmit,
  displayProduct,
  get_all_products,
} = require("../controllers/products");

router.get("/", renderProduct);

router.post("/", upload, handleProductsubmit);

router.get("/display", displayProduct);

router.get("/all", get_all_products);

module.exports = router;
