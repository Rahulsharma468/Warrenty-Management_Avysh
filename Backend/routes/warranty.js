const express = require("express");
const router = express.Router();

const {
    renderWarranty,
    handleSubmit,
    displayWarranty,
    editWarrenty,
    updateWarrenty,
    getOneWarranty,
    getAllWarranty,
    loginRoute,
    login,
    logout,
} = require("../controllers/warranty");

const { ensureAuthenticated } = require("../controllers/helper");

router.get("/", ensureAuthenticated, renderWarranty);

router.post("/", handleSubmit);

router.get("/display", ensureAuthenticated, displayWarranty);

router.get("/:id/edit", ensureAuthenticated, editWarrenty);

router.post("/:id/update", updateWarrenty);

router.get("/single/:id", getOneWarranty);

router.get("/login", loginRoute);

router.post("/login", login);

router.get("/logout", logout);

router.get("/all", getAllWarranty);
module.exports = router;