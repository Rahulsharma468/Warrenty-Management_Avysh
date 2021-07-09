const { getProduct, modifyProd } = require("../apicalls/products");
const moment = require("moment-timezone");
const dateIndia = moment.tz(Date.now(), "Asia/Kolkata");
const tempIndia = moment.utc(Date.now()).tz("Asia/Kolkata").format();
const prodModel = require("../../Backend/models/product");
var Cart = require("../models/cart");
var Temp = require("../models/temp");
var Helper = require("../models/helper");
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
  var temp = new Temp({
    purchaseDate: tempIndia,
  });
  for (let i = 0; i < items.length; i++) {
    var help = new Helper({
      extended: false,
    });
    if (items[i].item.hasOwnProperty("warrantyId")) {
      const warr = await getWarr(items[i].item.warrantyId);
      // const prod = await getProduct(items[i].item._id);
      // var prodobj = new prodModel(prod);
      // console.log(prodobj);
      // console.log(typeof prodobj);
      // prodobj.quantity -= items[i].quantity;
      // await prodobj.save();
      let mod = modifyProd(items[i].item._id, items[i].quantity);
      console.log(mod);
      help.warrName = warr.name;
      help.warrDuration = warr.duration;
      if (warr.extendable) {
        help.extendDur = warr.extendDur;
        help.extendPrice = warr.extendPrice;
      } else {
        help.extendDur = "";
        help.extendPrice = "";
      }
    } else {
      help.warrName = "";
      help.warrDuration = "";
      help.extendDur = "";
      help.extendPrice = "";
    }
    help.prodName = items[i].item.name;
    help.quantity = items[i].quantity;

    temp.items.push(help);
  }
  console.log(temp);
  req.user.orders.push(temp._id);

  await temp.save();
  await req.user.save();
  delete req.session.cart;
  res.redirect("/");
  // var names = [];
  // var qty = [];
  // var warrNames = [];
  // var durations = [];
  // var extendDurs = [];
  // var extendPrice = [];
  // for (let i = 0; i < items.length; i++) {
  //   console.log(items[i]);
  //   names.push(items[i].item.name);
  //   qty.push(items[i].quantity);
  //   if (items[i].item.hasOwnProperty("warrantyId")) {
  //     console.log("Warranty Id: " + items[i].item.warrantyId);
  //     const warr = await getWarr(items[i].item.warrantyId);
  //     console.log(warr.duration);
  //     warrNames.push(warr.name);
  //     durations.push(warr.duration);
  //     if (warr.extendable) {
  //       extendDurs.push(warr.extendDur);
  //       extendPrice.push(warr.extendPrice);
  //     } else {
  //       extendDurs.push("");
  //       extendPrice.push("");
  //     }
  //   } else {
  //     warrNames.push("");
  //     durations.push("");
  //     extendDurs.push("");
  //     extendPrice.push("");
  //   }
  // }
  // const order = new Order({
  //   prodName: names,
  //   quantity: qty,
  //   purchaseDate: Date.now(),
  //   warrName: warrNames,
  //   warrDuration: durations,
  //   extendDur: extendDurs,
  //   extendPrice: extendPrice,
  // });
  // console.log(order);
  // console.log(names);
};

module.exports = {
  addItem,
  getCart,
  removeItem,
  placeOrder,
};
