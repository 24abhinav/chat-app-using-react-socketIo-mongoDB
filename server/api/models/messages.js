(function() {

    const app = require('express');
    const router = app.Router();
    const db = require('../services/database');

    router.get('/:id', async (req, res) => {
        const messages = await db.findRecord('Messages', {roomId: req.params.id});
        if(messages) {
            res.status(200).send({messages, message: 'Fetched all messages fo selected room'})
        } else {
            res.status(500).send({message: 'Internal server Error'});
        }
    });

    module.exports = router;

}())
