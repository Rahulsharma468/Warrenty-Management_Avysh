const Product = require("../models/product");
const fs = require("fs");
const { getProducts, checkForLength } = require("./helper");
const path = require("path");

const renderProduct = (req, res) => {
  res.render("products");
};

const handleProductsubmit = (req, res) => {
  const name = req.body.name;
  const price = req.body.price;
  const category = req.body.category;
  const quantity = req.body.quantity;
  const description = req.body.description;
  var image;
  if (req.file) {
    image = req.sanitize(req.file.filename);
  }

  if (checkForLength([name, price, quantity, category, description, image])) {
    console.log("Ready");

    const newProduct = new Product({
      name,
      image,
      price,
      quantity,
      category,
      description,
    });

    // var data = fs.readFileSync("public/uploads/" + image);
    // newProduct.image.data = data.toString("base64");
    // fs.unlinkSync("public/uploads/" + image);

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
  var product = {
    name: req.sanitize(req.body.name),
    price: req.sanitize(req.body.price),
    category: req.sanitize(req.body.category),
    quantity: req.sanitize(req.body.quantity),
    description: req.sanitize(req.body.description),
  };

  if (req.file) {
    product.image = req.sanitize(req.file.filename);
  }

  if (
    !checkForLength([
      product.name,
      product.price,
      product.category,
      product.quantity,
      product.description,
    ])
  ) {
    res.redirect(`/product/${req.params.id}/edit`);
    return;
  }

  Product.findByIdAndUpdate(req.params.id, product, function (err, prod) {
    if (err) {
      console.log(err);
    }
    res.redirect("/product/display");
  });
};

const deleteProduct = (req, res) => {
  Product.findByIdAndRemove(req.params.id, function (err, food) {
    if (err) {
      console.log(err);
    }
    res.redirect("/product/display");
  });
};

const getImage = (req, res) => {
  const filename = req.params.filename;
  res.sendFile(filename, { root: "public/uploads" });
};

const modifyQty = async (req, res) => {
  let id = req.params.id;
  let qty = Number(req.params.qty);
  Product.findOneAndUpdate({ _id: id }, { $inc: { quantity: -qty } })
    .then((result) => {
      console.log(result);
      res.json(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json({ err });
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
  getImage,
  modifyQty,
};
