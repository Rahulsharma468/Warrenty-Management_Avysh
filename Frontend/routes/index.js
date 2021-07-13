const express = require("express");
const router = express.Router();
const { ensureAuthenticated } = require("../config/auth");
const { mainPage, renderDash } = require("../controllers/index");

router.get("/", mainPage);

router.get("/dashboard", ensureAuthenticated, renderDash);

module.exports = router;