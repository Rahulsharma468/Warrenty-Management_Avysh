var Order = require("../models/temp");

const getList = async (req, res) => {
  let list = req.user.orders;
  let curr = Date.now();
  Order.find({
    _id: { $in: list },
  })
    .lean()
    .then((result) => {
      for (let i = 0; i < result.length; i++) {
        let item = result[i].items;
        for (let j = 0; j < item.length; j++) {
          let temp = result[i].purchaseDate;
          let y = temp.getFullYear();
          let m = temp.getMonth();
          let d = temp.getDate();
          let newVal = new Date(
            y + item[j].warrDuration.year,
            m + item[j].warrDuration.month,
            d
          );
          if (item[j].extendDur.year === 0 && item[j].extendDur.month === 0)
            result[i].items[j].isExtendable = false;
          else result[i].items[j].isExtendable = true;
          if (newVal < curr) result[i].items[j].expired = true;
          else result[i].items[j].expired = false;
        }
      }
      res.render("orderList", { orders: result });
      // console.log(result);
      for (let i = 0; i < result.length; i++) console.log(result[i]);
    })
    .catch((err) => {
      res.json({ err });
      console.log(err);
    });
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
