module.exports = {
    entree: class {
        constructor(designation, dateEntree, dateSortie, voitureId, reparations) {
            this.designation = designation;
            this.dateEntree = dateEntree;
            this.dateSortie = dateSortie;
            this.voitureId = voitureId;
            this.reparations = reparations;
        }
    },
    collectionName: "entrees",
    options: {
        validator: {
            $jsonSchema: {
                bsonType: "object",
                title: "entree validation",
                required: ["dateEntree", "dateSortie", "voitureId"],
                properties: {
                    dateEntree: {
                        bsonType: "date",
                        description: "'date d'entree' doit être une date"
                    },
                    dateEntree: {
                        bsonType: "date",
                        description: "'date de sortie' doit être une date"
                    },
                    designation: {
                        bsonType: "string",
                        description: "'designation' doit être une chaine de caractère"
                    },
                    voitureId: {
                        bsonType: "objectId",
                        description: "'objectId' doit être une id dans le document voitures"
                    },
                    reparations: {
                        bsonType: "array",
                        description: "'reparations' reparations dans une entrée d'une voiture",

                    },
                    'reparations.description': {
                        bsonType: "string",
                        description: "'reparation desciption'"
                    },
                    'reparations.devis': {
                        bsonType: "object",
                        description: "'devis'"
                    },
                    "reparations.devis.prestation.designation": {
                        bsonType: "string",
                        description: "'reparation desciption'"
                    },
                    "reparations.devis.prestation.montant": {
                        bsonType: "double",
                        description: "'reparation desciption'"
                    },
                    "reparations.devis.achat.designation": {
                        bsonType: "string",
                        description: "'reparation desciption'"
                    },
                    "reparations.devis.achat.montant": {
                        bsonType: "double",
                        description: "'reparation desciption'"
                    },
                    'reparations.etat': {
                        bsonType: "string",
                        description: "'reparation desciption'"
                    },
                    'reparations.dateDebut': {
                        bsonType: "date",
                        description: "'reparation desciption'"
                    },
                    'reparations.dateFin': {
                        bsonType: "date",
                        description: "'reparation desciption'"
                    }
                }
            }
        }
    }
}