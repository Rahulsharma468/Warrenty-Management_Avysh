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
// const MongoStore = require('connect-mongo');
const userRouter = require("./routes/users");
const orderRouter = require("./routes/order");
const schedule = require("node-schedule");
const { scheduler } = require("./config/helper");
// const db = require("./config/keys").MongoURI;
const PORT = process.env.PORT || 5000;

const app = express();
const dotenv = require("dotenv");

require("./config/passport")(passport);
dotenv.config();
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
app.engine("handlebars", exphbs({ helpers: require("./config/hbhelp") }));
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

schedule.scheduleJob(`0 10 * * *`, scheduler);

app.use("/", indexRouter);

app.use("/item", prodRouter);

app.use("/users", userRouter);

app.use("/cart", cartRouter);

app.use("/order", orderRouter);

app.listen(PORT, function () {
  console.log("Server running on port 5000");
});
