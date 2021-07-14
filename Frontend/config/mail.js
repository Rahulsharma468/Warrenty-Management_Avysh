const sendNotification = () => {
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'uchihaitachi22093@gmail.com',
            pass: 'konnoyar@55066'
        }
    });

    var mailOptions = {
        from: 'uchihaitachi22093@gmail.com',
        to: "", //user email shd be accessed here 
        subject: 'Sending Email using Node.js',
        text: "your Product is gonna expire in so-so days"
            // html: '<h1>Hi Smartherd</h1><p>Your Messsage</p>'        
    };

    transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
};


module.exports = { sendNotification };