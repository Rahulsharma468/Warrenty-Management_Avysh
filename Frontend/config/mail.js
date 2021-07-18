const nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'uchihaitachi22093@gmail.com',
        pass: 'konnoyar@55066'
    }
});

const sendpendingNotification = (email) => {
    var mailOptions = {
        from: 'uchihaitachi22093@gmail.com',
        to: email,
        subject: 'Sending Email using Node.js',
        text: "your Product is gonna expire in so-so days"
    }

    transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}


const sendexpiredNotification = (email) => {
    var mailOptions = {
        from: 'uchihaitachi22093@gmail.com',
        to: email, //user email shd be accessed here 
        subject: 'Sending Email using Node.js',
        text: "your Product is gonna expire in so-so days"
    };

    transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
};


module.exports = { sendpendingNotification, sendexpiredNotification };