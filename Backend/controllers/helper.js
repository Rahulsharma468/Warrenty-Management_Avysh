const Product = require("../models/product");

const checkForLength = (arr) => {
  for (var e of arr) if (!e) return false;
  return true;
};

const getProducts = () => {
  return Product.find()
    .sort({ createdAt: -1 })
    .limit(100)
    .lean()
    .then((result) => {
      return result;
    })
    .catch((err) => {
      console.log(err);
      return [];
    });
};

module.exports = {
  checkForLength,
  getProducts,
};
