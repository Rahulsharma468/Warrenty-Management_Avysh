const { sendpendingNotification, sendexpiredNotification } = require("./mail");
const Orders = require("../models/temp");

const scheduler = () => {
  Orders.find({}).then(async (result) => {
    // let expDate = result.expiryDate;

    result.forEach((order) => {
      order.items.map(async (item) => {
        if (!item.expiryDate) return;
        // console.log(item.expiryDate);
        let expDate = item.expiryDate;
        let month = expDate.getMonth();
        let date = expDate.getDate();
        let year = expDate.getFullYear();

        const todays_date = new Date();
        const curr_month = todays_date.getMonth();
        const curr_date = todays_date.getDate();
        const curr_year = todays_date.getFullYear();

        if (
          date - curr_date === 5 &&
          curr_month === month &&
          curr_year === year
        ) {
          await sendpendingNotification(order.user, item, order);
        }

        if (
          date - curr_date === 0 &&
          curr_month === month &&
          curr_year === year
        ) {
          await sendexpiredNotification(order.user, item, order);
        }
      });
    });
    console.log("Done");

    // schedule.scheduleJob(`${result._id}`, `0 10 * * *`, async () => {

    // });
  });
};

// const scheduleNotification = async(item) => {
//     let expDate = item.expiryDate;
//     let y = expDate.getFullYear();
//     let m = expDate.getMonth();
//     let d = expDate.getDate();

//     let scheduleDate = new Date(y, m, d - 5);
//     schedule.scheduleJob(`${item._id}`, scheduleDate,async function() {
//         //send notification using nodemailer
//         await sendNotification() // import from mail.js

//         console.log("Success");
//     });
// };

// const rescheduleNotification = (item) => {
//     let expDate = item.expiryDate;
//     let y = expDate.getFullYear();
//     let m = expDate.getMonth();
//     let d = expDate.getDate();

//     let scheduleDate = new Date(y, m, d - 5);
//     schedule.rescheduleJob(`${item._id}`, scheduleDate, async function() {
//         //send notification using nodemailer
//         await sendNotification() // import from mail.js

//         console.log("Success");
//     });
// };

module.exports = {
  // scheduleNotification,
  // rescheduleNotification,
  scheduler,
};
