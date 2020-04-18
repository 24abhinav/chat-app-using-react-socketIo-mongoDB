(function() {

    const app = require('express');
    const router = app.Router();
    const db = require('../services/database');
    const { ObjectId } = require('mongodb');

    module.exports = router;

}())
