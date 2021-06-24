const express = require("express");
const bodyparser = require("body-parser");
const exphbs = require("express-handlebars");
const session = require("express-session");
const flash = require("connect-flash");
const mongoose = require("mongoose");
const passport = require("passport");
const prodRouter = require("./routes/products");
const cartRouter = require("./routes/cart");
const indexRouter = require("./routes/index");
const userRouter = require("./routes/users");
const db = require("./config/keys").MongoURI;
const app = express();

require("./config/passport")(passport);
mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected");
  })
  .catch((err) => {
    console.log("Error " + err.message);
  });

app.use(bodyparser.urlencoded({ extended: true }));
app.engine("handlebars", exphbs());
app.set("view engine", "handlebars");
app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
);
app.use(express.static("public"));

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use((req, res, next) => {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.error = req.flash("error");
  next();
});

app.use(function (req, res, next) {
  res.locals.session = req.session;
  next();
});

// app.get("/", (req, res) => {
//   res.render("desc");
// });
app.use("/", indexRouter);

app.use("/item", prodRouter);

app.use("/users", userRouter);

app.use("/cart", cartRouter);

app.listen(5000, function () {
  console.log("Server running on port 5000");
});
