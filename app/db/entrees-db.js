const { ObjectId } = require("mongodb");

const dbo = require("../config/connection").getDb();
const collection = dbo.collection("entrees");

module.exports = {
  getAll: async function () {
    return collection.find({}).toArray();
  },
  getOneById: async function (id) {
    const data = collection.aggregate([
      { $match: { _id: new ObjectId(id) } },
      {
        $lookup: {
          from: "voitures",
          localField: "voitureId",
          foreignField: "_id",
          as: "voiture"
        }
      }
    ]);
    return data.toArray();
  },

  saveOne: async function (entree) {
    return collection.insertOne(entree);
  },

  saveReparation: async function (entreeId, reparation) {
    return collection.updateOne(
      { _id: new ObjectId(entreeId) },
      { $push: { reparations: reparation } }
    );
  },

  getAllReparationByEntree: async function (entreeId) {
    const rep = collection.findOne({ _id: new ObjectId(entreeId) });
    return rep;
  },

  findEntreeWithCar: async function () {
    const data = collection.aggregate([
      {
        $lookup: {
          from: "voitures",
          localField: "voitureId",
          foreignField: "_id",
          as: "voiture"
        }
      }
    ]);
    return data.toArray();
  },

  updateReparation: async function (entreeId, reparationId) {
    return collection.updateOne(
      {
        _id: new ObjectId(entreeId),
        "reparations.reparationId": ObjectId(reparationId)
      },
      { $set: { "reparations.$.Etat": "Terminer" } }
    );
  },

  updateEntree:async function(entreeId){
    return collection.updateOne(
      {
        _id: new ObjectId(entreeId),
      },
      {$set:{bonDeSortie : "Valide", dateSortie: new Date()}}
    )
  },

  deleteReparation:async function(entreeId,reparationId){
    return collection.updateMany(
      {
        _id: new ObjectId(entreeId)
      },
      {
        $pull : { reparations:{   reparationId: ObjectId(reparationId) }}
      }
    )
  }
};
