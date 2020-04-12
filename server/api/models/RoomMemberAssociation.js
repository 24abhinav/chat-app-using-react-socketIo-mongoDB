(function() {
    const express = require('express');
    const router = express.Router();
    const model = 'RoomMemberAssociation';
    const db = require('../services/database');
    const tokenService = require('../services/token');

    router.post('/', async (req, res) => {
        const payload = req.body;
        const checkDuplicate = await db.findRecord(model, {memberId: payload.memberId, roomId: payload.roomId});
        if(checkDuplicate.length) {
            res.status(409).send({message: 'Member is already added to this Group'});
        } else {
            const newMember = await db.insertDataToCollection(model, payload);
            if(newMember) {
                res.status(200).send({message: 'Member Added successfully'});
            } else {
                res.status(500).send({message: 'Internal Server Error'});
            }
        }
    });

    router.get('/', async (req, res) => {
        const userDetails = await tokenService.decodeToken(req.headers.authorization);
        // const findQuery = [
        //     { $match: {memberId: userDetails._id}},
        //     { $lookup: {
        //             from: 'Room',
        //             localField: 'roomId',
        //             foreignField: '_id',
        //             as: 'Rooms'
        //         }
        //     }
        // ]
        // const data = await db.joinTables('RoomMemberAssociation', findQuery);
        // res.send(data);
        const findQuery = {memberId: userDetails._id}
        const roomDetails = await db.getAllGroupDetails('RoomMemberAssociation', findQuery);
        res.send(roomDetails);
    });

    router.delete('/leave', async (req, res) => {
        const query = {memberId: req.body.memberId, roomId: req.body.roomId}
        const deleteMember = await db.deleteOneRecord(query)
        if(deleteMember) {
            req.status(200).send({message: 'Member deleted successfully'});
        } else {
            res.status(500).send({message: 'Internal server Error'});
        }
    });

    module.exports = router;

}());
