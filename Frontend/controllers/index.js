// const { ensureAuthenticated } = require("../config/auth");

const mainPage = (req, res) => {
  res.render("pages/splash");
};

const renderDash = (req, res) => {
  res.render("pages/dashboard", {
    name: req.user.name,
  });
};

module.exports = {
  mainPage,
  renderDash,
};
