const express = require("express");
const router = express.Router();
const {
    login,
    register,
    handleRegister,
    handleLogin,
    handleLogout,
} = require("../controllers/users");

router.get("/login", login);

router.get("/register", register);

router.post("/register", handleRegister);

router.post("/login", handleLogin);

router.get("/logout", handleLogout);

module.exports = router;