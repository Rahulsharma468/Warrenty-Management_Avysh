const schedule = require("node-schedule");
const { sendNotification } = require('./mail');
const orders = require('../models/temp');

const schedule = async() => {
    orders.find({}).then(result => {
        let expDate = result.expiryDate;

        schedule.scheduleJob(`${result._id}`, `0 0 * * *`, () => {
            let month = expDate.getMonth();
            let date = expDate.getDate();
            let year = expDate.getFullYear();

            const todays_date = new Date();
            const curr_month = todays_date.getMonth();
            const curr_date = todays_date.getDate();
            const curr_year = todays_date.getFullYear();

            if (curr_date - date === 5 && curr_month === month && curr_year === year) {
                await sendpendingNotification();
            }

            if (date === 0 && year === curr_year && month === curr_month) {
                await sendexpiredNotification();
            }

        })

    })
}

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
    scheduleNotification,
    rescheduleNotification,
};