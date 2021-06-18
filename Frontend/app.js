const express = require("express");
const bodyparser = require("body-parser");
const exphbs = require("express-handlebars");
const mongoose = require("mongoose");
const session = require("express-session");
const prodRouter = require("./routes/products");
const cartRouter = require("./routes/cart");
const app = express();

app.use(bodyparser.urlencoded({ extended: true }));
app.engine("handlebars", exphbs());
app.set("view engine", "handlebars");
app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: true,
  })
);
app.use(express.static("public"));

app.use(function(req,res,next){
  res.locals.session = req.session;
  next();
})
mongoose
  .connect(
    "mongodb+srv://tanjiro:konnoyaro55066@cluster0.z7p3x.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("connected");
  })
  .catch((err) => {
    console.log("Not connected ", err.message);
  });
app.get("/", (req, res) => {
  res.render("desc");
});
app.use("/item", prodRouter);

app.use("/cart", cartRouter);

app.listen(5000, function () {
  console.log("Server running on port 5000");
});
