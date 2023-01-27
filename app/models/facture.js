const {ObjectId,Double} = require('mongodb')
module.exports = {
    Facture: class {
        constructor(idUser, idEntree,resumeUser, resumeVoiture, debutReparation, finReparation, motif,dateFacture,remise) {
            this.idUser = new ObjectId(idUser);
            this.idEntree = new ObjectId(idEntree);
            this.resumeUser = resumeUser
            this.resumeVoiture = resumeVoiture
            this.debutReparation = new Date(debutReparation)
            this.finReparation = new Date(finReparation)
            this.motif = motif
            this.dateFacture = new Date(dateFacture);
            this.remise = new Double(remise)
            this.details = [];
            this.paid = false;
            this.totalHT = 0;
            this.totalTTC = 0;
        }
        getTotalHT(){
            this.totalHT = this.details.reduce((prev, curr) => prev + curr.montant.value, 0)
        }
        getTotalTTC(){
            this.totalTTC = this.totalHT * (1 + parseFloat(process.env.TVA))
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
                    paid: {
                        bsonType:"bool",
                        description:"'paid' doit être un boolean",
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
        {indexInfo:{ "idUser": 1, }},
        {indexInfo:{ "idEntree": 1, }},
    ],
}