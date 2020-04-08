(function() {
    const express = require('express');
    const router = express.Router();
    const db = require('../services/database');
    const bcrypt = require('../services/bcrypt');
    const emailService = require('../services/email');
    const smsService = require('../services/message');
    const emailTemplates = require('../views/emailTemplates');
    const tokenService = require('../services/token');

    router.post('/signip', async (req, res) => {
        const payload = {...req.body};
        const checkDuplicate = await db.findRecord('User', {email: payload.email});
        if(checkDuplicate.length) {
            res.status(400).send({message: 'User Is already exist!'});
        } else {
            payload.password = await bcrypt.encryptPassword(payload.password);
            if(!payload.password) {
                res.status(500).send({message: 'Internal server Error'});
            } else {
                const token = await tokenService.createToken(req, payload, '1h');
                const mailOption = {
                    from: '',
                    to: payload.email,
                    subject: 'Please verify your Email to activate your account',
                    html: emailTemplates.verifyEmail(token)
                }
                await emailService.sendEmail(mailOption);
                // await smsService.sendOtp({mobile: payload.mobile});
                const insertData = await db.insertOneDataToCollection('User', payload);
                if(insertData) {
                    res.status(200).send({message: 'Sign Up Successful! Email has been send'});
                }
            }
        }
    });

    module.exports = router;

}());

