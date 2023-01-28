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
            this.details = {achat:[],prestation:[]};
            this.paid = false;
            this.totalHT = {achat:0, prestation:0, total:0};
            this.totalTTC = {taux:Number.parseFloat(process.env.TVA),montantTaxe:0, montant:0};
        }
        getTotalHT(){
            this.totalHT.achat = this.details.achat.reduce((prev, curr) => prev + curr.montant.value, 0)
            this.totalHT.prestation = this.details.prestation.reduce((prev, curr) => prev + curr.montant.value, 0)
            this.totalHT.total = this.totalHT.achat + this.totalHT.prestation
        }
        getTotalTTC(){
            this.totalTTC.montantTaxe = this.totalHT.total * this.totalTTC.taux
            this.totalTTC.montant = this.totalHT.total + this.totalTTC.montantTaxe
        }
    },
    FactureDetail: class {
        constructor(desc,montant, typeDevis){
            this.description = desc
            this.montant = new Double(montant)
            this.typeDevis = typeDevis 
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
                    "details.prestation": {
                        bsonType: "array",
                        items: {
                            bsonType: "object",
                            required: [
                              "description",
                              "montant",
                              "typeDevis"
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
                                typeDevis: {
                                    enum:["prestation","achat"],
                                    description:"'montant' doit être `prestation ou `achat`",
                                },
                            }
                        }
                    },
                    "details.achat": {
                        bsonType: "array",
                        items: {
                            bsonType: "object",
                            required: [
                              "description",
                              "montant",
                              "typeDevis"
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
                                typeDevis: {
                                    enum:["prestation","achat"],
                                    description:"'montant' doit être `prestation ou `achat`",
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