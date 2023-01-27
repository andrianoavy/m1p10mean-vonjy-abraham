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

  getLastOneByIdVoiture: async function (idVoiture, isDateSortieNull = true) {
    const where = {
      idVoiture: new ObjectId(idVoiture),
      $orderby: { dateEntree: -1 }
    };
    if (isDateSortieNull) {
      where.dateSortie = null
    }
    return collection.findOne(where)
  },

  getEtatVoiture: async function (voitureId) {
    const lastEntree = await collection
      .find({
        'voitureId': new ObjectId(voitureId),
      })
      .sort({ dateEntree: -1 })
      .limit(1).toArray();
    const etat = "Chez le client"
    if (!Array.isArray(lastEntree) || !lastEntree[0]) {
      return etat
    }
    if (lastEntree[0].dateEntree) {
      return "Réparée"
    }
    return "En réparation"
  },
  updateEntree: async function (entreeId) {
    return collection.updateOne(
      {
        _id: new ObjectId(entreeId),
      },
      { $set: { bonDeSortie: "Valide", dateSortie: new Date() } }
    )
  },

  deleteReparation: async function (entreeId, reparationId) {
    return collection.updateMany(
      {
        _id: new ObjectId(entreeId)
      },
      {
        $pull: { reparations: { reparationId: ObjectId(reparationId) } }
      }
    )
  },

  filterEntreeWithCar: async function (search) {
    return
  },

  tempDeReparationMoyen: async function () {
    return collection.aggregate([
      {
        $unwind: "$reparations"
      },
      {
        $project: {
          _id: 0,
          dateDiffReparation: {
            "$dateDiff": {
              "startDate": {
                $convert: {
                  input: "$reparations.dateDebut",
                  to: "date"
                }
              },
              "endDate": {
                $convert: {
                  input: "$reparations.dateFin",
                  to: "date"
                }
              },
              "unit": "hour"
            }
          }
        }
      }
    ]).toArray()
  },

  chiffreAffaireParMois: async function () {
    return collection.aggregate([
      {
        $unwind: "$reparations"
      },
      {
        "$match": {
          "dateEntree": {
            "$gte": ISODate("2023-01-01"),
            "$lt": ISODate("2024-01-01")
          }
        }
      },
      {
        $group: {
          _id: {
            $month: "$dateEntree"
          },
          totalPrestation: {
            $sum: "$reparations.montantPrestation"
          },
          totalAchat: {
            $sum: "$reparations.montantAchat"
          }
        }
      },
      {
        $sort: {
          _id: 1
        }
      }
    ])
  },

  chiffreAffaireParJour: async function () {
    return collection.aggregate([
      {
        $unwind: "$reparations"
      },
      {
        "$match": {
          "dateEntree": {
            "$gte": ISODate("2023-01-01"),
            "$lt": ISODate("2024-01-01")
          }
        }
      },
      {
        $group: {
          _id: {
            $dateToString: {
              format: "%Y-%m-%d",
              date: "$dateEntree"
            }
          },
          totalPrestation: {
            $sum: "$reparations.montantPrestation"
          },
          totalAchat: {
            $sum: "$reparations.montantAchat"
          }
        }
      },
      {
        $sort: {
          _id: 1
        }
      }
    ])
  }

};
