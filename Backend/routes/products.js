const express = require("express");
const router = express.Router();
const { upload } = require("../controllers/helper");

const {
  renderProduct,
  handleProductsubmit,
  displayProduct,
  get_all_products,
  get_product,
} = require("../controllers/products");

router.get("/", renderProduct);

router.post("/", upload, handleProductsubmit);

router.get("/display", displayProduct);

router.get("/all", get_all_products);

router.get("/:prodId", get_product);

module.exports = router;
