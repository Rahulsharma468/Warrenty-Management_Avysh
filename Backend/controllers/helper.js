const Product = require("../models/product");
const multer = require("multer");

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

const get_taken_products = () => {
  return Product.find({ noWarranty: true })
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

const storage = multer.diskStorage({
  //destination for files
  destination: function (request, file, callback) {
    callback(null, "./public/uploads");
  },

  //add back the extension
  filename: function (request, file, callback) {
    callback(null, Date.now() + file.originalname);
  },
});

//upload parameters for multer
const upload = multer({
  storage: storage,
}).single("file");

module.exports = {
  checkForLength,
  upload,
  getProducts,
  get_taken_products,
};
