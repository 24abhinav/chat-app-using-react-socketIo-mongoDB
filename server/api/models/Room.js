(function() {

    const express = require('express');
    // const token = require('')
    const router = express.Router();
    const model = 'Room'
    const db = require('../services/database');
    const tokenService = require('../services/token');

    router.post('/', async (req, res) => {
        let roomId = 'CHAT-';
        let characters = 'ABCDEFG34678tryugedhjeHIJK34tr673628329y3eurgehLMNOPQRSTUVWXYZabcdef32674y37xtb76t3xbn83764577rtyfuunx8776473uiheuei32y8y5bx84y7t76r4t3283292iei3ighijklmnopqrstuvwxyz0123456dfbvjhfdb789sdbdhbshp38dgw6';
        for ( let i = 0; i < 10; i++ )
            roomId += characters.charAt(Math.floor(Math.random() * 200));
        
        const payload = {...req.body, roomId};
        const roomDetails = await db.insertDataToCollection(model, payload);
        if(roomDetails) {
            res.status(200).send({message: 'New Room Created', roomDetails});
        } else {
            res.status(500).send({message: 'Internal Server Error'});
        }
    });

    router.get('/', async (req, res) => {
        // const userDetails = await tokenService.decodeToken(req.headers.authorization);
        // const rooms = await db.findRecord('Room', {memberId: userDetails._id});
        // if(rooms) {
        //     res.status(200).send(rooms)
        // } else {
        //     res.status(500).send({message: 'Internal server Error'});
        // }
    });

    module.exports = router;
}());
