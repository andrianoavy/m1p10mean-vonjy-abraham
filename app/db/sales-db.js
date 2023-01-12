const {ObjectId} = require('mongodb')
const dbo = require('../Config/connection').getDb()
const collection = dbo.collection('sales')

module.exports = {    
    getAll: async function () {
        return collection.find({}).toArray();
    },
    getOneById: async function (id) {
        return collection.findOne({_id:new ObjectId(id)});
    },

    saveOne: async function (sale) {
        return collection.insertOne(sale);
    },
}