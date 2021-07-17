const bcrypt = require("bcryptjs");
const passport = require("passport");
const User = require("../models/User");

const login = (req, res) => {
    res.render("pages/login");
};

const register = (req, res) => {
    res.render("pages/register");
};

const handleRegister = (req, res) => {
    const { name, email, password, password2 } = req.body;
    let errors = [];

    // Check required fields
    if (!name || !email || !password || !password2) {
        errors.push({ msg: "Please fill in all fields" });
    }

    // Check pwd match
    if (password !== password2) {
        errors.push({ msg: "Passwords don't match" });
    }

    // Check pwd length
    if (password.length < 6) {
        errors.push({ msg: "Passwords should be at least 6 characters" });
    }

    if (errors.length > 0) {
        res.render("pages/register", {
            errors,
            name,
            email,
            password,
            password2,
        });
    } else {
        // Validation passed
        User.findOne({ email: email }).then((user) => {
            if (user) {
                // User exists
                errors.push({ msg: "Email is already registered" });
                res.render("register", {
                    errors,
                    name,
                    email,
                    password,
                    password2,
                });
            } else {
                const newUser = new User({
                    name,
                    email,
                    password,
                });

                // Hash Password
                bcrypt.genSalt(10, (err, salt) =>
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if (err) throw err;
                        // Set password to hashed
                        newUser.password = hash;
                        // Save user
                        newUser
                            .save()
                            .then((user) => {
                                req.flash("success_msg", "You are registered and can log in.");
                                res.redirect("/users/login");
                            })
                            .catch((err) => console.log(err));
                    })
                );
            }
        });
    }
};

const handleLogin = (req, res, next) => {
    passport.authenticate("local", {
        successRedirect: "/item/all",
        failureRedirect: "/users/login",
        failureFlash: true,
    })(req, res, next);
};

const handleLogout = (req, res, next) => {
    delete req.session.cart;
    req.logout();
    req.flash("success_msg", "you are logged out");
    res.redirect("/users/login");
};

module.exports = {
    login,
    register,
    handleRegister,
    handleLogin,
    handleLogout,
};