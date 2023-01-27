const {ObjectId,Double} = require('mongodb')
module.exports = {
    Facture: class {
        constructor(idUser, idEntree,motif,dateFacture,remise) {
            this.idUser = new ObjectId(idUser);
            this.idEntree = new ObjectId(idEntree);
            this.motif = motif
            this.dateFacture = new Date(dateFacture);
            this.remise = new Double(remise)
            this.details = [];
        }
    },
    FactureDetail: class {
        constructor(desc,montant){
            this.description = desc
            this.montant = new Double(montant)
        }
    },
    collectionName:"factures",
    options: {
        validator: {
            $jsonSchema: {
                bsonType: "object",
                title: "Facture validation",
                required: ["idUser", "idEntree", "dateFacture"],
                properties: {
                    idUser: {
                        bsonType: "objectId",
                        description: "'idUser' doit être un objectId"
                    },
                    idEntree: {
                        bsonType: "objectId",
                        description: "'idEntree' doit être un objectId"
                    },
                    motif: {
                        bsonType: "string",
                        description: "'motif' doit être un objectId"
                    },
                    dateFacture: {
                        bsonType: "date",
                        description: "'dateFacture' doit être une date"
                    },
                    remise: {
                        bsonType:"double",
                        description:"'remise' doit être un double",
                        minimum:0,
                    },
                    details: {
                        bsonType: "array",
                        items: {
                            bsonType: "object",
                            required: [
                              "description",
                              "montant",
                            ],
                            additionalProperties: false,
                            description: "'items' must contain the stated fields.",
                            properties: {
                                description: {
                                    bsonType:"string",
                                    description:"'description' doit être une chaîne de charactère"
                                },
                                montant: {
                                    bsonType:"double",
                                    description:"'montant' doit être un double",
                                    minimum:0,
                                },
                            }
                        }
                    }
                }
            }
        }
    },
    indexes:[
        {indexInfo:{ "idUser": 1, },isUnique:true},
        {indexInfo:{ "idEntree": 1, },isUnique:true},
    ],
}