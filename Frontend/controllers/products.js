const Product = require("../models/product");

const get_all_products = async (req, res) => {
  Product.find()
    .sort({ createdAt: -1 })
    .limit(100)
    .then((result) => {
      res.json(result);
      console.log(result);
    })
    .catch((err) => {
      console.log(err);
    });
};
const get_one = async (req, res) => {
  let id = req.params.prodId;
  Product.findOne({ _id: id })
    .lean()
    .then((result) => {
      res.render("desc", { prod: result });
      console.log(result);
    })
    .catch((err) => {
      console.log(err);
    });
};
module.exports = {
  get_all_products,
  get_one,
};
