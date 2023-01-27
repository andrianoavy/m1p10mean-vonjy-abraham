const { ObjectId } = require("mongodb");

const dbo = require("../config/connection").getDb();
const collection = dbo.collection(require('../models/facture').collectionName);

module.exports = {
    saveOne: async function (entree) {
        return collection.insertOne(entree);
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
                { "resumeVoiture": { $regex: `.*${search}.*`, $options: 'i' } },
                { "motif": { $regex: `.*${search}.*`, $options: 'i' } },
            ]
        if(!options.showPaid){
            where.paid=false
        }

        const factures = await collection.aggregate([
            { $match: where , },
            {
                $sort: { dateFacture: -1 }
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
}