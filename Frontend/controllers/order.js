var Order = require("../models/temp");

const getList = async (req, res) => {
  if (!req.user) {
    res.render("pages/login");
  } else {
    let list = req.user.orders;
    Order.find({
      _id: { $in: list },
    })
      .lean()
      .then((result) => {
        res.render("orderList", { orders: result });
        console.log(result);
      })
      .catch((err) => res.json({ err }));
  }
};

module.exports = { getList };
