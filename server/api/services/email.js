(function() {
    const nodemailer = require('nodemailer');
    require('dotenv').config();


    const gmailCredental = {
        service : 'gmail',
        auth: {
            user: process.env.EMIAL_ID,
            pass: process.env.EMIAL_PASSWORD
        }
    };
    const transpoter = nodemailer.createTransport(gmailCredental); 

    console.log(gmailCredental);
    // transpoter.verify((err, verify) => {
    //     if(err) {
    //         console.log('confir is not correct-->', err)
    //     } else {
    //         console.log('your config is correct--->', verify);
    //     }
    // });

    sendEmail = (mailOptions) => {
        return new Promise(async (res, rej) => {

            mailOptions.from = gmailCredental.user;
            const result = await send(mailOptions);
            res(result);
        });
    },

    send = (mailOptions) => {
        return new Promise(async (res, rej) => {
            transpoter.sendMail(mailOptions, (err, result) => {
                res(result);
            });
        }); 
    },

    module.exports = {
        sendEmail,
    };
}());