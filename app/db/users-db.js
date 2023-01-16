const dbo = require('../Config/connection').getDb()
const collection = dbo.collection('Users')
const { ObjectId } = require('mongodb')

module.exports = {
    saveOne: async function(user) {
        return collection.insertOne(user);
    },
    findOneById: async function(id) {
        return collection.findOne({ _id: new ObjectId(id) });
    },
    findOne: async function(where) {
        return collection.findOne(where);
    },
    getAll: async function() {
        return collection.find().toArray();
    }
}