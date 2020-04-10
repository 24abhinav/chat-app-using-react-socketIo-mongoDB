(function() {
    
    var MongoClient = require('mongodb').MongoClient;
    var url = "mongodb://localhost:27017/";
    var database;
    MongoClient.connect(url, {useUnifiedTopology: true}, function(err, db) {
        if (err) throw err;
        database = db.db('ChatApp');
        // db.close();
    });

    insertOneDataToCollection = async (collectionName, collectionObj) => {
        return new Promise((resolve, reject) => {
            const today = new Date().toISOString();
            const payload = {
                createdAt: today,
                updatedAt: today,
                ...collectionObj
            }
            database.collection(collectionName).insertOne(collectionObj, (err, result) => {
                resolve(result);
            });
        });
    },

    insertManyDataToCollection = async (collectionName, collectionObjArray) => {
        return new Promise((resolve, reject) => {
            database.collection(collectionName).insertMany(collectionObjArray, (err, result) => {
                resolve(result);
            });
        });
    },

    updateOneRecord = async (collectionName, query, collectionObj) => {
        return new Promise((resolve, reject) => {
            let newValue = {...collectionObj, updatedAt: new Date().toISOString()};
            newValue =  {$set: newValue};
            database.collection(collectionName).updateOne(query, newValue, (err, result) => {
                resolve(result);
            });
        });
    },

    updateManyRecord = async (collectionName, query, collectionObj) => {
        return new Promise((resolve, reject) => {
            let newValue = {...collectionObj, updatedAt: new Date().toISOString()};
            newValue =  {$set: newValue};
            database.collection(collectionName).updateMany(query, newValue, (err, result) => {
                resolve(result);
            });
        });
    },

    findRecord = async (collectionName, findQuery) => {
        return new Promise((resolve, reject) => {
            database.collection(collectionName).find(findQuery).toArray((err, result) => {
                resolve(result);
            });
        });
    },

    deleteOneRecord = async (collectionName, deleteQuery) => {
        return new Promise((resolve, reject) => {
            database.collection(collectionName).deleteOne(deleteQuery, (err, result) => {
                resolve(result);
            });
        });
    },
    
    module.exports = {
        insertOneDataToCollection,
        insertManyDataToCollection,
        findRecord,
        deleteOneRecord,
    };

}());
