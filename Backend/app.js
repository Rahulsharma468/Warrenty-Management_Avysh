const express = require("express");
const bodyparser = require("body-parser");
const exphbs = require("express-handlebars");
const mongoose = require("mongoose");
const expressSanitizer = require("express-sanitizer");
const warrantyRouter = require("./routes/warranty.js");
const productrouter = require("./routes/products");
const app = express();

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
      useFindAndModify: true,
    }
  )
  .then(() => {
    console.log("connected");
  })
  .catch((err) => {
    console.log("Not connected ", err.message);
  });

app.set("view engine", "handlebars");
app.use(express.static("public"));

app.use("/", warrantyRouter);
app.use("/product", productrouter);

app.listen(3000, function () {
  console.log("Server running on port 3000");
});
