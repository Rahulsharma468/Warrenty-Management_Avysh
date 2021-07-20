const nodemailer = require("nodemailer");

var transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  pool: true,
  auth: {
    user: "warrantyhelpavysh@gmail.com",
    pass: "avysh@2021",
  },
});

const sendpendingNotification = async (user, item, order) => {
  var mailOptions = {
    from: "warrantyhelpavysh@gmail.com",
    to: user.email,
    subject: "Warranty Expiry in 5 days!!",
    text: `Dear ${user.name},
    The warranty of your ${item.prodName} purchased on ${order.purchaseDate} is going to expire in 5 days. 
Please visit http://localhost:5000 to extend or redeem your warranty.

Thank you.

Regards
Avysh Help`,
  };

  await transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};

const sendexpiredNotification = async (user, item, order) => {
  var mailOptions = {
    from: "warrantyhelpavysh@gmail.com",
    to: user.email,
    subject: "Warranty Expired!",
    text: `Dear ${user.name},
    The warranty of your ${item.prodName} purchased on ${order.purchaseDate} has expired. 

Thank you.

Regards
Avysh Help`,
  };

  await transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};

module.exports = { sendpendingNotification, sendexpiredNotification };
