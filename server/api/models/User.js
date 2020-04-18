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
    const { ObjectID } = require('mongodb');

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
                const insertData = await db.insertDataToCollection(model, payload);
                if(insertData) {
                    res.status(200).send({message: 'Sign Up Successful! Email has been send'});
                } else {
                    res.status(500).send({message: 'Internal Server Error'});
                }
            }
        }
    });

    router.post('/login', async (req, res) => {
        const payload = req.body;
        if(!payload.email || !payload.password) {
            res.status(400).send({message: 'Parametre(s) is missing'});
        } else {
            const userData = await db.findRecord(model, {email: payload.email});
            if(userData.length) {
                const passwordCheck = await bcrypt.passwordCompare(userData[0].password, payload.password);
                if(passwordCheck) {
                    const tokenObj = {
                        email: userData[0].email,
                        name: userData[0].name,
                        _id: userData[0]._id
                    }
                    const loginToken = await tokenService.createToken(req, tokenObj, '5h');
                    if(loginToken) {
                        // await res.cookie('S', loginToken);
                        // res.cookie('S',loginToken, { maxAge: 900000, httpOnly: true });
                        res.status(200).send({message: 'Login successfull',userData, token: loginToken});
                    } else {
                        res.status(500).send({message: 'Internal Server Error'});
                    }
                } else {
                    res.status(400).send({message: 'Check your Email or password'});
                }
            } else {
                res.status(400).send({message: 'Check your Email or password'});
            }
        }
    });

    router.get('/userDetails', async (req, res) => {
        let tokenDetails = req.headers.authorization;
        tokenDetails =  await tokenService.decodeToken(tokenDetails);
        const userDetails = await db.findRecord(model, {_id: ObjectID(tokenDetails._id)});
        res.json(userDetails[0]);
    });

    router.post('/logout', async (req, res) => {
        await res.clearCookie('S');
        res.status(200).send({message: 'Logout successfull'});
    });


    module.exports = router;

}());

