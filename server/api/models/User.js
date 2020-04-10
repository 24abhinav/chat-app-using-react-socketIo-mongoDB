(function() {
    
    const express = require('express');
    const router = express.Router();
    const db = require('../services/database');
    const bcrypt = require('../services/bcrypt');
    const emailService = require('../services/email');
    const smsService = require('../services/message');
    const emailTemplates = require('../views/emailTemplates');
    const tokenService = require('../services/token');
    const model = 'User';

    router.post('/signup', async (req, res) => {
        const payload = {...req.body};
        const checkDuplicate = await db.findRecord(model, {email: payload.email});
        if(checkDuplicate.length) {
            res.status(409).send({message: 'User Is already exist!'});
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
                const insertData = await db.insertOneDataToCollection(model, payload);
                if(insertData) {
                    res.status(200).send({message: 'Sign Up Successful! Email has been send'});
                } else {
                    res.status(500).send({message: 'Internal Server Error'});
                }
            }
        }
    });

    router.post('/login', async (req, res) => {
        console.log(req.headers);
        const payload = req.body;
        if(!payload.email || !payload.password) {
            res.status(400).send({message: 'Parametre(s) is missing'});
        } else {
            const userData = await db.findRecord(model, {email: payload.email});
            if(userData.length) {
                const passwordCheck = await bcrypt.passwordCompare(userData[0].password, payload.password);
                if(passwordCheck) {
                    const loginToken = await tokenService.createToken(req, payload, '5h');
                    if(loginToken) {
                        // await res.cookie('S', loginToken);
                        // res.cookie('S',loginToken, { maxAge: 900000, httpOnly: true });
                        res.status(200).send({message: 'Login successfull',userData, token: loginToken});
                    } else {
                        res.status(500).send({message: 'Internal Server Error'});
                    }
                } else {
                    res.status(400).send({message: 'Check your Email or password wrong'});
                }
            } else {
                res.status(400).send({message: 'Email i snot fount Check your Email or password'});
            }
        }
    });

    router.post('/logout', async (req, res) => {
        console.log(req.cookies.S);
        // await res.clearCookie('S');
        res.status(200).send({message: 'Logout successfull'});
    });


    module.exports = router;

}());

