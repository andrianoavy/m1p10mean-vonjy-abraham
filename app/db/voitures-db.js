const { ObjectId } = require('bson');

const dbo = require('../config/connection').getDb()
const collection = dbo.collection('Voitures')

module.exports = {
    saveOne: async function (voiture) {
        return collection.insertOne(voiture);
    },
    findOneById: async function (id) {
        return collection.findOne({_id:new ObjectId(id)});
    },
    findOne: async function (where) {
        return collection.findOne(where);
    },
    findAll: async function () {
        return collection.findOne();
    },
    findAllWhere: async function (where) {
        return collection.find(where).toArray();
    },
    findAllByClient:async function (idUser){
        return collection.find({_idUser:new ObjectId(idUser)}).toArray();
    }
}