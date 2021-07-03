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
const app = express();

// Passport config
require("./controllers/passport")(passport);

var methodOverride = require("method-override");

app.use(expressSanitizer());

app.use(bodyparser.urlencoded({ extended: true }));
app.engine("handlebars", exphbs());

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

  app.use(
    session({
      secret: "tanjiro@384474785",
      resave: true,
      saveUninitialized: true,
    })
  );

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Connect flash
app.use(flash());

// Global Vars
app.use((req, res, next) => {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.error = req.flash("error");
  next();
});

app.use(express.static("public"));
app.set("view engine", "handlebars");

app.use("/", warrantyRouter);
app.use("/product", productrouter);


app.listen(3000, function () {
  console.log("Server running on port 3000");
});
