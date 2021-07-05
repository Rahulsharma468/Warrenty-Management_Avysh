const { getProduct } = require("../apicalls/products");
var Cart = require("../models/cart");
var Order = require("../models/order");
const { getWarr } = require("../apicalls/warranty");
const addItem = async (req, res) => {
  let id = req.params.id;
  let qty = req.params.qty;
  if (!req.user) {
    res.render("pages/login");
  } else {
    let cart = new Cart(req.session.cart ? req.session.cart : {});
    const result = await getProduct(id);
    if (Number(qty) <= result.quantity) {
      cart.add(result, id, qty);
      req.session.cart = cart;
      console.log(cart);
      res.render("disp_cart", {
        item: cart.getItems(),
        total: cart.totalPrice,
        quantity: cart.totalItems,
      });
    } else {
      res.send("<h1>Quantity Exceeded</h1>");
    }
  }
};

const getCart = (req, res) => {
  if (!req.user) {
    res.render("pages/login");
  } else if (!req.session.cart || req.session.cart.totalItems == 0) {
    console.log(req.user);
    console.log("No cart");
    res.render("disp_cart", { item: {} });
  } else {
    var cart = new Cart(req.session.cart);
    var items = cart.getItems();
    for (let i = 0; i < items.length; i++) {
      {
        console.log(items[i]);
      }
    }
    res.render("disp_cart", {
      item: cart.getItems(),
      total: cart.totalPrice,
      quantity: cart.totalItems,
    });
  }
};

const removeItem = (req, res) => {
  var id = req.params.id;
  var qty = req.params.qty;
  var cart = new Cart(req.session.cart ? req.session.cart : {});
  if (cart.totalItems === 0 || cart === {}) {
    res.render("disp_cart", { item: {} });
  } else {
    cart.remove(id, qty);
    req.session.cart = cart;
    console.log(cart);
    res.render("disp_cart", {
      item: cart.getItems(),
      total: cart.totalPrice,
      quantity: cart.totalItems,
    });
  }
};

const placeOrder = async (req, res) => {
  var cart = new Cart(req.session.cart);
  var items = cart.getItems();
  var names = [];
  var qty = [];
  var warrNames = [];
  var durations = [];
  var extendDurs = [];
  var extendPrice = [];
  for (let i = 0; i < items.length; i++) {
    console.log(items[i]);
    names.push(items[i].item.name);
    qty.push(items[i].quantity);
    if (items[i].item.hasOwnProperty("warrantyId")) {
      console.log("Warranty Id: " + items[i].item.warrantyId);
      const warr = await getWarr(items[i].item.warrantyId);
      console.log(warr.duration);
      warrNames.push(warr.name);
      durations.push(warr.duration);
      if (warr.extendable) {
        extendDurs.push(warr.extendDur);
        extendPrice.push(warr.extendPrice);
      } else {
        extendDurs.push("");
        extendPrice.push("");
      }
    } else {
      warrNames.push("");
      durations.push("");
      extendDurs.push("");
      extendPrice.push("");
    }
  }
  const order = new Order({
    prodName: names,
    quantity: qty,
    purchaseDate: Date.now(),
    warrName: warrNames,
    warrDuration: durations,
    extendDur: extendDurs,
    extendPrice: extendPrice,
  });
  console.log(order);
  console.log(names);
};

module.exports = {
  addItem,
  getCart,
  removeItem,
  placeOrder,
};
