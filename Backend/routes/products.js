const express = require("express");
const router = express.Router();
const { upload, ensureAuthenticated } = require("../controllers/helper");

const {
    renderProduct,
    handleProductsubmit,
    displayProduct,
    get_all_products,
    get_product,
    editProducts,
    deleteProduct,
    updateProduct,
    getImage,
    modifyQty,
} = require("../controllers/products");

router.get("/", ensureAuthenticated, renderProduct);

router.post("/", upload, handleProductsubmit);

router.get("/display", ensureAuthenticated, displayProduct);

router.get("/all", get_all_products);

router.get("/:id/edit", ensureAuthenticated, editProducts);

router.post("/:id/update", upload, updateProduct);

router.delete("/:id", ensureAuthenticated, deleteProduct);

router.get("/:prodId", get_product);

router.get("/image/:filename", getImage);

router.get("/modify/:id&:qty", modifyQty);

module.exports = router;