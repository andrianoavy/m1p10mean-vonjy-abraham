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

    findAllWithLastEntree: async function (where) {
        let condition = where
        if(typeof where === "string")
            condition = {_idUser:new ObjectId(where)}
        const voitures = await collection.aggregate([
            { $match: { ...condition }, },
            {
                $lookup:
                {
                    from: "entrees",
                    localField: "_id",
                    foreignField: "voitureId",
                    as: "entree",
                    pipeline: [
                    {
                        $sort: { dateEntree: -1 }
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
        ]).toArray()
        if(Array.isArray(voitures))
            return voitures.map(this.addEtat);
        return []
    },

    searchByClientWithLE: async function(idUser, search){
        return this.findAllWithLastEntree(
            {
                _idUser: new ObjectId(idUser),
                $or: [
                    { "numImmatricul": { $regex: `.*${search}.*`, $options: 'i' } },
                    { "marque": { $regex: `.*${search}.*`, $options: 'i' } },
                    { "model": { $regex: `.*${search}.*`, $options: 'i' } },
                ]
            }
        )
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
                        $sort: { dateEntree: -1 }
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
        if(Array.isArray(voiture))
            return voiture.map(this.addEtat);
        return voiture;
    },
    findVoitureWithHistorique: async function (where, page, itemCount) {
        let skip = parseInt(page) || 0
        let limit = parseInt(itemCount) || 10
        skip = limit * skip
        if (skip < 0) skip = 0
        if (limit <= 0) skip = 10
        const voiture = await collection.aggregate([
            { $match: { ...where }, },
            {
                $lookup:
                {
                    from: "entrees",
                    localField: "_id",
                    foreignField: "voitureId",
                    as: "entrees",
                    pipeline: [
                        {
                            $sort: { dateEntree: -1 }
                        },
                        {
                            $skip: skip
                        },
                        {
                            $limit: limit
                        },
                    ],
                },
            },
            { $limit: 1 }
        ]).toArray();
        if (Array.isArray(voiture) && voiture.length > 0) {
            const countWhere = { voitureId: voiture[0]._id }
            const count = await dbo.collection('entrees').countDocuments(countWhere)
            return { voiture: voiture[0], page: (skip), total: count }
        }
        return null;
    },


    addEtat: function (voiture) {
        if (voiture.entree) {
            if (voiture.entree.dateSortie) {
                voiture.etat = "Réparée"
                return voiture
            }
            voiture.etat = "En réparation"
            return voiture
        }
        voiture.etat = "Avec le client"
        return voiture
    }
}