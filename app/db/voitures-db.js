const { ObjectId } = require('bson');
const { collectionName } = require('../models/voiture')

const dbo = require('../config/connection').getDb()
const collection = dbo.collection(collectionName)

module.exports = {
    saveOne: async function (voiture) {
        return collection.insertOne(voiture);
    },
    findOneById: async function (id) {
        return collection.findOne({ _id: new ObjectId(id) });
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
    findAllByClient: async function (idUser) {
        return collection.find({ _idUser: new ObjectId(idUser) }).toArray();
    },
    findAllSearchByClient: async function (idUser, search) {
        return collection.find({
            _idUser: new ObjectId(idUser), 
            $or:[
                {"numImmatricul" : {$regex : `.*${search}.*`,$options:'i'}},
                {"marque" : {$regex : `.*${search}.*`,$options:'i'}},
                {"model" : {$regex : `.*${search}.*`,$options:'i'}},
            ]
        }).toArray();
    }
}