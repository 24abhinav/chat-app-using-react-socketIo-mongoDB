var nodemailer = require('nodemailer');
require('dotenv').config();

(function() {
    const emailcredentials = {
        user: process.env.EMIAL_ID,
        pass: process.env.EMIAL_PASSWORD
    }

    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: emailcredentials
    });

    transporter.verify((err, resukt) => {
        if(err) {
            console.log('error-->', err)
        }
    });

    sendEmail = (mailOptions) => {
        return new Promise(async (res, rej) => {
            mailOptions.from = emailcredentials.user;
            transporter.sendMail(mailOptions, (err, result) => {
                res(result);
            });
        });
    },


    module.exports = {
        sendEmail,
    };


}());
