const express = require("express");
const bodyparser = require("body-parser");
const exphbs = require("express-handlebars");
const mongoose = require("mongoose");
const expressSanitizer = require("express-sanitizer");
const warrantyRouter = require("./routes/warranty.js");
const productrouter = require("./routes/products");
const flash = require("connect-flash");
const session = require("express-session");
const passport = require("passport");
const { getImage } = require("./controllers/products.js");
const app = express();

// Passport config
require("./controllers/passport")(passport);

var methodOverride = require("method-override");

app.use(expressSanitizer());

app.use(methodOverride("_method"));

mongoose.Promise = global.Promise;

mongoose
  .connect(
    "mongodb+srv://tanjiro:konnoyaro55066@cluster0.z7p3x.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    }
  )
  .then(() => {
    console.log("connected");
  })
  .catch((err) => {
    console.log("Not connected ", err.message);
  });

app.use(bodyparser.urlencoded({ extended: true }));
app.get("/image/:filename", getImage);

app.engine("handlebars", exphbs());
app.set("view engine", "handlebars");
app.use(
  session({
    secret: "tanjiro@384474785",
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
  res.locals.user = req.user;
  next();
});

app.use("/", warrantyRouter);
app.use("/product", productrouter);

app.listen(3000, function () {
  console.log("Server running on port 3000");
});
