const {ObjectId} = require('bson')
module.exports = {
<<<<<<< HEAD
  Entree: class {
    constructor(designation, dateEntree, dateSortie, voitureId, reparations) {
      this.designation = designation;
      this.dateEntree = dateEntree;
      this.dateSortie = dateSortie;
      this.voitureId = voitureId;
      this.reparations = reparations;
=======
    Entree: class {
        constructor(designation, dateEntree, dateSortie, voitureId, reparations) {
            this.designation = designation;
            this.dateEntree = new Date(dateEntree);
            if(dateSortie)
                this.dateSortie = new Date(dateSortie);
            this.voitureId = new ObjectId(voitureId);
            this.reparations = reparations;
        }
    },
    collectionName: "entrees",
    options: {
        validator: {
            $jsonSchema: {
                bsonType: "object",
                title: "entree validation",
                required: ["dateEntree", "voitureId"],
                properties: {
                    dateEntree: {
                        bsonType: "date",
                        description: "'date d'entree' doit être une date"
                    },
                    dateSortie: {
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
                    'reparations.designationPrestation': {
                        bsonType: "string",
                        description: "'devis'"
                    },
                    "reparations.montantPrestation": {
                        bsonType: "double",
                        minimum: 0,
                        description: "'reparation desciption'"
                    },
                    "reparations.designationAchat": {
                        bsonType: "string",
                        description: "'reparation desciption'"
                    },
                    "reparations.montantAchat": {
                        bsonType: "double",
                        minimum: 0,
                        description: "'reparation desciption'"
                    },
                    "reparations.dateDebut": {
                        bsonType: "date",
                        description: "'reparation desciption'"
                    },
                    'reparations.dateFin': {
                        bsonType: "date",
                        description: "'reparation desciption'"
                    },
                    'reparations.etat': {
                        enum: ["En attente","En cours","Terminer"],
                        description: "'reparation desciption'"
                    }
                    
                }
            }
        }
>>>>>>> 70ccd39da6b629846a726869ce4b44ec52a8f2ab
    }
  },
  collectionName: "entrees",
  options: {
    validator: {
      $jsonSchema: {
        bsonType: "object",
        title: "entree validation",
        required: ["dateEntree", "voitureId"],
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
            items: {
              bsonType: "object",
              required: [
                "repatationId",
                "designationPrestation",
                "montantPrestation",
                "designationAchat",
                "montantAchat",
                "dateDebut",
                "Etat"
              ],
              additionalProperties: false,
              description: "'items' must contain the stated fields.",
              properties: {
                reparationId: {
                  bsonType: "objectId",
                  description: "'reparationId' must be objectId"
                },
                description: {
                  bsonType: "string",
                  description: "description reparation"
                },
                designationPrestation: {
                  bsonType: "string",
                  description: "designationPrestation"
                },
                montantPrestation: {
                  bsonType: "double",
                  description: "montantPrestation"
                },
                designationAchat: {
                  bsonType: "string",
                  description: "designationAchat"
                },
                montantAchat: {
                  bsonType: "double",
                  description: "montantAchat"
                },
                dateDebut: {
                  bsonType: "date",
                  description: "dateDebut"
                },
                dateFin: {
                  bsonType: "date",
                  description: "dateDebut"
                },
                Etat: {
                  enum: ["En attente", "En cours", "Terminer"],
                  description: "Etat reparation"
                }
              }
            }
          }
        }
      }
    }
  }
};
