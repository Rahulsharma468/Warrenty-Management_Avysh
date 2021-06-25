const Product = require("../models/product");
const { getProducts, checkForLength } = require("./helper");

const renderProduct = (req, res) => {
  res.render("products");
};

const handleProductsubmit = (req, res) => {
  // console.log(req.body);
  console.log(req.file);
  const name = req.body.name;
  const price = req.body.price;
  const category = req.body.category;
  const quantity = req.body.quantity;
  const description = req.body.description;
  const image = req.file.filename;
  if (checkForLength([name, price, quantity, category, description])) {
    console.log("Ready");
    const newProduct = new Product({
      image,
      name,
      price,
      quantity,
      category,
      description,
    });
    newProduct
      .save()
      .then(() => {
        console.log("Saved");
        res.redirect("/product/display");
      })
      .catch((err) => {
        console.log("Error", err.message);
      });
  } else {
    res.render("products", { error: "Please fill all the fields" });
  }
};

const displayProduct = async (req, res) => {
  try {
    const products = await Product.find({}).lean();
    console.log(products);
    res.render("display_products", { products: products });
  } catch (error) {
    console.log(error);
  }
};

const get_all_products = async (req, res) => {
  const products = await getProducts();
  res.json(products);
};

const get_product = async (req, res) => {
  let id = req.params.prodId;
  Product.findOne({ _id: id })
    .lean()
    .then((result) => {
      console.log(result);
      res.json(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json({
        err,
      });
    });
};

const editProducts = async (req, res) => {
  let id = req.params.id;
  Product.findOne({ _id: id })
    .lean()
    .then((result) => {
      res.render("editProducts", { result: result });
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json({
        err,
      });
    });
};

const updateProduct = (req, res) => {
  Product.updateOne(req.params.id, req.body, function (err, food) {
    if (err) {
      console.log(err);
    }
    res.redirect("/product/display");
  });

  console.log(req.body);
};

const deleteProduct = (req, res) => {
  Product.findByIdAndRemove(req.params.id, function (err, food) {
    if (err) {
      console.log(err);
    }
    res.redirect("/product/display");
  });
};

module.exports = {
  renderProduct,
  handleProductsubmit,
  displayProduct,
  get_all_products,
  get_product,
  editProducts,
  updateProduct,
  deleteProduct,
};
