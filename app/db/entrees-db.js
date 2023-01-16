const { ObjectId } = require('mongodb');

const dbo = require('../Config/connection').getDb()
const collection = dbo.collection('entrees')

module.exports = {
    getAll: async function() {
        return collection.find({}).toArray();
    },
    getOneById: async function(id) {
        return collection.findOne({ _id: new ObjectId(id) });
    },

    getByName: async function(username) {
        return collection.find({ name: username });
    },

    saveOne: async function(entree) {
        return collection.insertOne(entree);
    },

    saveRepartion: async function(entreeId, reparation) {
        return collection.
    }
}