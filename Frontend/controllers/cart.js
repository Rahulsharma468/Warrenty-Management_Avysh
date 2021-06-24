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
    res.render("disp_cart",{item:cart.getItems(),total:cart.totalPrice,quantity:cart.totalItems});
  } else {
    res.send("<h1>Quantity Exceeded</h1>");
  }
};

const getCart = (req, res) => {
  if(!req.user){
    res.render("pages/login");
  }
  else if (!req.session.cart || req.session.cart.totalItems == 0) {
    console.log("No cart");
    res.render("disp_cart",{item:{}});
  } else {
    var cart = new Cart(req.session.cart);
    console.log(cart.getItems());
    res.render("disp_cart",{item:cart.getItems(),total:cart.totalPrice,quantity:cart.totalItems});
  }
};

const removeItem = (req, res) => {
  var id = req.params.id;
  var qty = req.params.qty;
  var cart = new Cart(req.session.cart ? req.session.cart : {});
  if (cart.totalItems === 0 || cart === {}) {
    res.render("disp_cart",{item:{}});
  } else {
    cart.remove(id, qty);
    req.session.cart = cart;
    console.log(cart);
    res.render("disp_cart",{item:cart.getItems(),total:cart.totalPrice,quantity:cart.totalItems});
  }
};

module.exports = {
  addItem,
  getCart,
  removeItem,
};
