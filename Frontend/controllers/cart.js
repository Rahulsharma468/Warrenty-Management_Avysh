const { getProduct } = require("../apicalls/products");
var Cart = require("../models/cart");

const addItem = async (req, res) => {
  let id = req.params.id;
  let qty = req.params.qty;
  let cart = new Cart(req.session.cart ? req.session.cart : {});
  const result = await getProduct(id);
  if (Number(qty) <= result.quantity) {
    cart.add(result, id, qty);
    req.session.cart = cart;
    console.log(cart);
    res.send("<h1>Done</h1>");
  } else {
    res.send("<h1>Quantity Exceeded</h1>");
  }
};

const getCart = (req, res) => {
  if (!req.session.cart || req.session.cart.totalItems == 0) {
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
  var qty = req.params.qty;
  var cart = new Cart(req.session.cart ? req.session.cart : {});
  if (cart.totalItems === 0 || cart === {}) {
    res.send("<h1>Cart Empty</h1>");
  } else {
    cart.remove(id, qty);
    req.session.cart = cart;
    console.log(cart);
    res.send("<h1>Done</h1>");
  }
};

module.exports = {
  addItem,
  getCart,
  removeItem,
};
