const { ObjectId } = require('mongodb');

const dbo = require('../config/connection').getDb()
const collection = dbo.collection('entrees')

module.exports = {
    getAll: async function() {
        return collection.find({}).toArray();
    },
    getOneById: async function(id) {
        return collection.findOne({ _id: new ObjectId(id) });
    },

    getByName: async function(username) {
        return collection.find({ name: username });
    },

    saveOne: async function(entree) {
        return collection.insertOne(entree);
    },

    saveReparation: async function(entreeId, reparation) {
        return collection.updateOne({ _id: new ObjectId(entreeId) }, { $push: { reparations: reparation } })
    },

    getAllReparationByEntree: async function(entreeId) {
        return collection.findOne({ _id: new ObjectId(entreeId) });
    },

    findEntreeWithCar: async function() {
        const data = collection.aggregate([{
            $lookup: {
                from: 'voitures',
                localField: 'voitureId',
                foreignField: '_id',
                as: 'voiture'
            }
        }]);
        return data.toArray();
    },

    updateSequenceValue: async function(sequenceName) {
        return dbo.collection('sample').update({ _id: sequenceName }, { $inc: { sequence_value: 1 } })
    },

    getValueForNextSequence: async function() {
        return dbo.collection('sample').findOne();
    }
}