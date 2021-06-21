const { getProduct } = require("../apicalls/products");
var Cart = require("../models/cart");

const addItem = async (req, res) => {
  let id = req.params.id;
  let cart = new Cart(req.session.cart ? req.session.cart : {});
  const result = await getProduct(id);
  cart.add(result, id);
  console.log(typeof result);
  req.session.cart = cart;
  console.log(cart);
  res.send("<h1>Done</h1>");
};

const getCart = (req, res) => {
  if (!req.session.cart) {
    console.log("No cart");
    res.json({ msg: "Cart empty" });
  } else {
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
  res.send("<h1>Done</h1>");
};

module.exports = {
  addItem,
  getCart,
  removeItem,
};
