const { ObjectId } = require('mongodb');

const dbo = require('../config/connection').getDb()
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

    saveOne: async function(sale) {
        return collection.insertOne(sale);
    },

    saveRepartion: async function(entreeId, reparation) {
        return
    }
}