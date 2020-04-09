(function() {
    const express = require('express');
    const router = express.Router();
    const model = 'RoomMemberAssociation';
    const db = require('../services/database');

    router.post('/add', async (req, res) => {
        const payload = req.body;
        const checkDuplicate = await db.findRecord(model, {memberId: payload.memberId, roomId: payload.roomId});
        if(checkDuplicate.length) {
            res.status(409).send({message: 'This member is already added to this Room'});
        } else {
            const newMember = await db.insertOneDataToCollection(model, payload);
            if(newMember) {
                res.status(200).send({message: 'Member Added successfully'});
            } else {
                res.status(500).send({message: 'Internal Server Error'});
            }
        }
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
