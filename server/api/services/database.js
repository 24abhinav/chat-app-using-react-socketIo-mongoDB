(function() {
    
    // var MongoClient = require('mongodb').MongoClient;
    // var ObjectId = require('mongodb').ObjectId; 

    const { MongoClient, ObjectId} = require('mongodb');

    var url = "mongodb://localhost:27017/";
    var database;
    MongoClient.connect(url, {useUnifiedTopology: true}, function(err, db) {
        if (err) throw err;
        database = db.db('ChatApp');
        // db.close();
    });

    insertDataToCollection = async (collectionName = "Dummy", collectionObj = {}, many = false) => {
        return new Promise((resolve, reject) => {
            const today = new Date().toISOString();
            const payload = {
                createdAt: today,
                updatedAt: today,
                ...collectionObj
            }
            if(many) {
                database.collection(collectionName).insertMany(collectionObjArray, (err, result) => {
                    resolve(result);
                });
            } else {
                database.collection(collectionName).insertOne(collectionObj, (err, result) => {
                    resolve(result);
                });
            }
            
        });
    },

    updateRecord = async (collectionName = "Dummy" , query = {}, collectionObj = {}, many = false) => {
        return new Promise((resolve, reject) => {
            
            if(collectionName === 'Dummy') {
                resolve();
                console.log('Collection Name is missing!!');
                return;
            }

            if(many) {
                database.collection(collectionName).updateMany(query, newValue, (err, result) => {
                    resolve(result);
                });
            } else {

                let newValue = {...collectionObj, updatedAt: new Date()};
                newValue =  {$set: newValue};
                database.collection(collectionName).updateOne(query, newValue, (err, result) => {
                    resolve(result);
                });
            }
        });
    },

    findRecord = async (collectionName, findQuery, type = true) => {
        return new Promise((resolve) => {
            if(type) {
                database.collection(collectionName).find(findQuery).toArray((err, result) => {
                    resolve(result);
                });
            } else {
                database.collection(collectionName).findOne(findQuery, (err, result) => {
                    resolve(result);
                });
            }
        });
    },

    joinTables = async (collectionName, findQuery) => {
        return new Promise((resolve) => {
            database.collection(collectionName).aggregate(findQuery).toArray((err, result) => {
                resolve(result);
            });
        });
    },

    deleteOneRecord = async (collectionName, deleteQuery) => {
        return new Promise((resolve) => {
            database.collection(collectionName).deleteOne(deleteQuery, (err, result) => {
                resolve(result);
            });
        });
    },


    // --------------------

    getAllGroupDetails = async (collectionName, findQuery) => {
        
        return new Promise(async (resolve) => {
            const groups = await findRecord(collectionName, findQuery)
            Promise.all(
                groups.map(async (item) => {
                    item.roomId = await findRecord('Room', {_id: ObjectId(item.roomId)});
                })
            ).then(() => {
                resolve(groups);
            });
        });
    },
    
    module.exports = {
        insertDataToCollection,
        findRecord,
        deleteOneRecord,
        joinTables,
        getAllGroupDetails,
        updateRecord
    };

}());
