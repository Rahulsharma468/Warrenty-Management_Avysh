var Order = require("../models/temp");

const getList = async (req, res) => {
  let list = req.user.orders;
  Order.find({
    _id: { $in: list },
  })
    .lean()
    .then((result) => {
      res.render("orderList", { orders: result });
      console.log(result);
      for (let i = 0; i < result.length; i++) console.log(result[i].items);
    })
    .catch((err) => res.json({ err }));
};

const extend = async (req, res) => {
  let order = req.params.ordId;
  let idx = req.params.idx;
  console.log(order + " " + idx);
  let data = await Order.findOne({ _id: order });
  console.log(data.items[idx]);
  let newVal = {
    year: data.items[idx].extendDur.year + data.items[idx].warrDuration.year,
    month: data.items[idx].extendDur.month + data.items[idx].warrDuration.month,
  };
  data.items[idx].warrDuration = newVal;
  data.items[idx].extended = true;
  data.items[idx].extendDur.year = 0;
  data.items[idx].extendDur.month = 0;
  data
    .save()
    .then((result) => {
      res.redirect("/order");
    })
    .catch((err) => {
      res.json({ err });
    });
};

module.exports = { getList, extend };
