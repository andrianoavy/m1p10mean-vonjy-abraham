const dbo = require('../config/connection').getDb()
const collection = dbo.collection(require('../models/user').collectionName)

module.exports = {
    saveOne: async function (user,options) {
        return collection.insertOne(user,options);
    },
    findOneById: async function (id) {
        return collection.findOne({_id:new ObjectId(id)});
    },
    findOne: async function (where) {
        return collection.findOne(where);
    },
}