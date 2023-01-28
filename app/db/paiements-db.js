const { ObjectId } = require('mongodb');

const dbo = require('../config/connection').getDb()
const collection = dbo.collection("paiements")

module.exports = {
    saveOne: async function (idUser, paiement) {
        paiement.client.id = new ObjectId(idUser)
        return collection.insertOne(paiement);
    },

    valider: async function (id) {
        return collection.updateOne({ _id: new ObjectId(id) }, { $set: { valid: true } });
    },


    findAllPaiements: async function (options) {

        let skip = parseInt(options.page) || 0
        let limit = parseInt(options.itemCount) || 10
        skip = limit * skip

        if (skip < 0) skip = 0
        if (limit <= 0) skip = 10

        const where = { valid: false }

        if (options.search)
            where.$or = [
                { "client.infos": { $regex: `.*${options.search}.*`, $options: 'i' } },
                { "methode": { $regex: `.*${options.search}.*`, $options: 'i' } },
            ]
        if (options.showValid) {
            delete where.valid
        }

        const paiements = await collection.aggregate([
            { $match: where, },
            { $project: { details: 0 } },
            {
                $sort: { datePaiement: -1, valid: -1 }
            },
            {
                $skip: skip
            },
            {
                $limit: limit
            },
        ]).toArray();

        if (Array.isArray(paiements) && paiements.length > 0) {
            const countWhere =
                (options.showValid) ?
                    {}
                    :
                    { valid: false }
            const count = await collection.countDocuments(countWhere)
            return { paiements: paiements, page: skip, total: count }
        }
        return { paiements: [], page: skip, total: 0 };
    },
}