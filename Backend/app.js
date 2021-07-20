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
const PORT = process.env.PORT || 3000;
const dotenv = require("dotenv");
// const MongoStore = require('connect-mongo');
const app = express();

dotenv.config();
// Passport config
require("./controllers/passport")(passport);

var methodOverride = require("method-override");

app.use(expressSanitizer());

app.use(methodOverride("_method"));

mongoose.Promise = global.Promise;

mongoose
  .connect(process.env.MOGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
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
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: true,
    // store: MongoStore.create({
    //     mongoUrl: process.env.MOGODB_URI
    // }),
    cookie: { maxAge: 180 * 60 * 1000 },
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

app.listen(PORT, function () {
  console.log("Server running on port 3000");
});
