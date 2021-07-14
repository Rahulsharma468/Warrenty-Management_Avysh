const schedule = require("node-schedule");
const { sendNotification } = require('./mail');

const scheduleNotification = async(item) => {
    let expDate = item.expiryDate;
    let y = expDate.getFullYear();
    let m = expDate.getMonth();
    let d = expDate.getDate();

    let scheduleDate = new Date(y, m, d - 5);
    schedule.scheduleJob(`${item._id}`, scheduleDate, function() {
        //send notification using nodemailer
        await sendNotification() // import from mail.js

        console.log("Success");
    });
};

const rescheduleNotification = (item) => {
    let expDate = item.expiryDate;
    let y = expDate.getFullYear();
    let m = expDate.getMonth();
    let d = expDate.getDate();

    let scheduleDate = new Date(y, m, d - 5);
    schedule.rescheduleJob(`${item._id}`, scheduleDate, async function() {
        //send notification using nodemailer
        await sendNotification() // import from mail.js

        console.log("Success");
    });
};

module.exports = {
    scheduleNotification,
    rescheduleNotification,
};