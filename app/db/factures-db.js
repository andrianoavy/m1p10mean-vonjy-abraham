const { ObjectId } = require("mongodb");

const dbo = require("../config/connection").getDb();
const collection = dbo.collection(require('../models/facture').collectionName);

module.exports = {
    saveOne: async function (entree) {
        return collection.insertOne(entree);
    },
    findOne: async function(where){
        return collection.findOne(where)
    },
    findAllFactures: async function (userId, options) {
        const idUser = new ObjectId(userId)

        let skip = parseInt(options.page) || 0
        let limit = parseInt(options.itemCount) || 10
        skip = limit * skip

        if (skip < 0) skip = 0
        if (limit <= 0) skip = 10
        
        const where = {paid:false}

        where.idUser = idUser
        if(options.search)
            where.$or= [
                { "resumeVoiture": { $regex: `.*${options.search}.*`, $options: 'i' } },
                { "motif": { $regex: `.*${options.search}.*`, $options: 'i' } },
            ]
        if(options.showPaid){
                delete where.paid
        }

        const factures = await collection.aggregate([
            { $match: where , },
            { $project : { details :0 } },
            {
                $sort: { dateFacture: -1, paid:-1 }
            },
            {
                $skip: skip
            },
            {
                $limit: limit
            },
        ]).toArray();

        if (Array.isArray(factures) && factures.length > 0) {
            const countWhere = 
                (options.showPaid)?
                    { idUser: idUser }
                :
                { idUser: idUser, paid:false }
            const count = await collection.countDocuments(countWhere)
            return { factures: factures, page: skip, total: count }
        }
        return {factures:[],page:skip, total:0};
    },
    updateOne:async function(idFacture, set){
        return collection.updateOne({_id:new ObjectId(idFacture)},set)
    }
}