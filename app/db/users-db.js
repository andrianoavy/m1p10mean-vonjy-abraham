const dbo = require('../Config/connection').getDb()
const collection = dbo.collection('Users')

module.exports = {
    saveOne: async function (user) {
        return collection.insertOne(user);
    },
    findOneById: async function (id) {
        return collection.findOne({_id:id});
    },
    findOne: async function (where) {
        return collection.findOne(where);
    },
}