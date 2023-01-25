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
        return collection.find().toArray();
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
            $or: [
                { "numImmatricul": { $regex: `.*${search}.*`, $options: 'i' } },
                { "marque": { $regex: `.*${search}.*`, $options: 'i' } },
                { "model": { $regex: `.*${search}.*`, $options: 'i' } },
            ]
        }).toArray();
    },
    findOneWithEntree: async function (where) {
        const voiture = await collection.aggregate([
            { $match: { ...where }, },
            {
                $lookup:
                {
                    from: "entrees",
                    localField: "_id",
                    foreignField: "voitureId",
                    as: "entree",
                    pipeline: [{
                        $match: {
                            dateSortie: null,
                        },
                    },
                    {
                        $sort: {dateEntree:-1}
                    },
                    {
                        $limit: 1
                    }],
                },
            },
            {
                $set: {
                    entree: { $arrayElemAt: ["$entree", 0] }
                }
            },
            { $limit: 1 }
        ]).toArray();
        return voiture;
    }
}