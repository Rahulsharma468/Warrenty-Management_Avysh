const express = require("express");
const router = express.Router();
const { getList } = require("../controllers/order");
const { ensureAuthenticated } = require("../config/auth");

router.get("/", ensureAuthenticated, getList);

module.exports = router;
