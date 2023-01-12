const dbo = require('../Config/connection').getDb()
const collection = dbo.collection('users')

module.exports = {
    getAll: async function() {
        return collection.find({}).toArray();
    },
    getOneById: async function(id) {
        return collection.findOne({ _id: Number.parseInt(id) });
    },

    saveOne: async function(sale) {
        return collection.insertOne(sale);
    },
}