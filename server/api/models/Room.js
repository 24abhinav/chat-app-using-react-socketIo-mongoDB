(function() {

    const express = require('express');
    // const token = require('')
    const router = express.Router();
    const { ObjectId }  = require('mongodb');
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

            const userDetails = await tokenService.decodeToken(req.headers.authorization);
            const newMemberPayload = {memberId: ObjectId(userDetails._id), roomId: roomDetails.ops[0]._id};
            await db.insertDataToCollection('RoomMemberAssociation', newMemberPayload);

            const message = {
                memberId: userDetails._id,
                memberName: userDetails.name,
                message: userDetails.name + ' created this group',
                type: 1,
                time: new Date().toLocaleTimeString('en-In'),
                roomId: roomId
            }
            await db.insertDataToCollection('Messages', message);
            await db.insertDataToCollection('RoomMemberAssociation', newMemberPayload);
            res.status(200).send({message: 'New Room Created', roomDetails: roomDetails.ops[0]});
        } else {
            res.status(500).send({message: 'Internal Server Error'});
        }
    });

    router.get('/:id', async (req, res) => {
        const messageJoinQuery = [
            {$match: {_id: ObjectId(req.params.id)}},
            {
                $lookup: {
                    from: 'Messages',
                    localField: 'roomId',
                    foreignField: 'roomId',
                    as: 'Messages',
                }
            }
        ]
        const roomDetails = await db.joinTables('Room', messageJoinQuery);
        const memberJoiQuery = [
            {$match: {roomId: ObjectId(req.params.id)}},
            {
                $lookup: {
                    from: 'User',
                    localField: 'memberId',
                    foreignField: '_id',
                    as: 'memberId'
                }
            }
        ];
        const memberDetails = await db.joinTables('RoomMemberAssociation', memberJoiQuery);
        if(roomDetails) {
            res.status(200).send({roomDetails, memberDetails})
        } else {
            res.status(500).send({message: 'Internal server Error'});
        }
    });

    module.exports = router;
}());
