var Cart = require("../models/cart");
var Product = require("../models/product");

const addItem = async (req, res) => {
  let id = req.params.id;
  let cart = new Cart(req.session.cart ? req.session.cart : {});
  Product.findOne({ _id: id })
    .lean()
    .then((result) => {
      cart.add(result, id);
      console.log(typeof result);
      req.session.cart = cart;
      console.log(cart);
      // console.log(result);
      res.send("<h1>Done</h1>");
    })
    .catch((err) => {
      console.log(err);
    });
};

const getCart = (req, res) => {
  if (!req.session.cart) {
    console.log("No cart");
  }
  else{
  var cart = new Cart(req.session.cart);
  console.log(cart.getItems());
  res.json(cart.getItems());
}
};

const removeItem = (req, res) => {
  var id = req.params.id;
  var cart = new Cart(req.session.cart ? req.session.cart : {});

  cart.remove(id);
  req.session.cart = cart;
  console.log("removed");
  res.send("<h1>Done</h1>")
};

module.exports = {
  addItem,
  getCart,
  removeItem,
};
