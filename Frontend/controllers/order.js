var Order = require("../models/temp");
const moment = require("moment");
require("moment-precise-range-plugin");
const getList = async (req, res) => {
  let list = req.user.orders;
  Order.find({
    _id: { $in: list },
  })
    .lean()
    .then((result) => {
      for (let i = 0; i < result.length; i++) {
        let item = result[i].items;
        let temp = result[i].purchaseDate;
        for (let j = 0; j < item.length; j++) {
          let y = temp.getFullYear();
          let m = temp.getMonth();
          let d = temp.getDate();
          let newVal = new Date(
            y + item[j].warrDuration.year,
            m + item[j].warrDuration.month,
            d
          );
          if(item[j].warrDuration.year === 0 && item[j].warrDuration.month === 0)
            result[i].items[j].noWarr = true;
          else
            result[i].items[j].noWarr = false;
          // let timediff = newVal.getTime() - curr;
          var today = moment();
          var end = moment(newVal);
          var diff = moment.preciseDiff(today, end, true);
          console.log(diff);
          if (diff.firstDateWasLater) {
            result[i].items[j].expired = true;
            result[i].items[j].remainingTime = "Expired";
          } else {
            if (diff.years === 0 && diff.months === 0) {
              if (diff.days === 0) {
                result[i].items[j].expired = true;
                result[i].items[j].remainingTime = "Expired";
              } else {
                result[i].items[j].expired = false;
                result[i].items[j].remainingTime = diff;
              }
            } else {
              result[i].items[j].expired = false;
              result[i].items[j].remainingTime = diff;
            }
          }
          // if (timediff > 0) {
          //   var diff = moment.preciseDiff(today, end, true);
          //   result[i].items[j].remainingTime = diff;
          //   // console.log(diff);
          // } else {
          //   result[i].items[j].remainingTime = "Expired";
          // }
          if (item[j].extendDur.year === 0 && item[j].extendDur.month === 0)
            result[i].items[j].isExtendable = false;
          else result[i].items[j].isExtendable = true;
          // if (timediff <= 0) result[i].items[j].expired = true;
          // else result[i].items[j].expired = false;
        }
      }
      res.render("orderList", { orders: result });
    })
    .catch((err) => {
      res.json({ err });
      console.log(err);
    });
};

// const extend = async (req, res) => {
//   let order = req.params.ordId;
//   let idx = req.params.idx;
//   console.log(order + " " + idx);
//   let data = await Order.findOne({ _id: order });
//   console.log(data.items[idx]);
//   let newVal = {
//     year: data.items[idx].extendDur.year + data.items[idx].warrDuration.year,
//     month: data.items[idx].extendDur.month + data.items[idx].warrDuration.month,
//   };
//   data.items[idx].warrDuration = newVal;
//   data.items[idx].extended = true;
//   data.items[idx].extendDur.year = 0;
//   data.items[idx].extendDur.month = 0;
//   data
//     .save()
//     .then((result) => {
//       res.redirect("/order");
//     })
//     .catch((err) => {
//       res.json({ err });
//     });
// };
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

  let orderDate = data.purchaseDate;
  let y = orderDate.getFullYear();
  let m = orderDate.getMonth();
  let d = orderDate.getDate();

  data.items[idx].expiryDate = new Date(
    y + data.items[idx].warrDuration.year,
    m + data.items[idx].warrDuration.month,
    d
  );
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
