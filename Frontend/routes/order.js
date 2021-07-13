const express = require("express");
const router = express.Router();
const { getList, extend } = require("../controllers/order");
const { ensureAuthenticated } = require("../config/auth");

router.get("/", ensureAuthenticated, getList);

router.get("/:ordId&:idx", ensureAuthenticated, extend);

module.exports = router;