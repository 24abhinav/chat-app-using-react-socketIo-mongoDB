const Nexmo = require('nexmo');
require('dotenv').config();
(function() {
    const nexmo = new Nexmo({
        apiKey: process.env.NEXMO_API_KEY,
        apiSecret: process.env.NEXMO_API_SECRET,
    });

    otpArray = [];

    sendOtp = (option) => {
        return new Promise((resolve, reject) => {
            const otp = Number((Math.random() * 100000).toString().slice(0,5));
            otpArray.push(otp)
            const from = 'Chat App';
            const to = option.mobile;
            const text = 'Otp for activate your account is ' + otp;

            nexmo.message.sendSms(from, to, text, (err, responseData) => {
                if (err) {
                    console.log(err);
                    resolve(null);
                } else {
                    if(responseData.messages[0]['status'] === "0") {
                        console.log(responseData);
                        console.log("Message sent successfully.");
                        resolve(otpArray.length - 1);
                    } else {
                        console.log(`Message failed with error: ${responseData.messages[0]['error-text']}`);
                        resolve(null);
                    }
                }
            });
        });
    }

    module.exports = {
        sendOtp,
    }
}());
