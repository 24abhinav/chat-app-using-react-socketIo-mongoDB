(function() {

    const express = require('express');
    const router = express.Router();
    const model = 'Room'
    const db = require('../services/database');

    router.post('/new', async (req, res) => {
        let roomId = 'CHAT-';
        let characters = 'ABCDEFG34678tryugedhjeHIJK34tr673628329y3eurgehLMNOPQRSTUVWXYZabcdef32674y37xtb76t3xbn83764577rtyfuunx8776473uiheuei32y8y5bx84y7t76r4t3283292iei3ighijklmnopqrstuvwxyz0123456dfbvjhfdb789sdbdhbshp38dgw6';
        for ( let i = 0; i < 10; i++ )
            roomId += characters.charAt(Math.floor(Math.random() * 200));
        
        const payload = {...req.body, roomId};
        const roomDetails = await db.insertOneDataToCollection(model, payload);
        if(roomDetails) {
            res.status(200).send({message: 'New Room Created', roomDetails});
        } else {
            res.status(500).send({message: 'Internal Server Error'});
        }
    });

    module.exports = router;
}());
