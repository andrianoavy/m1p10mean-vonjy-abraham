const { ObjectId } = require("bson");
module.exports = {
  Entree: class {
    constructor(designation, dateEntree, dateSortie, voitureId, reparations) {
      this.designation = designation;
      this.dateEntree = new Date(dateEntree);
      if (dateSortie) this.dateSortie = new Date(dateSortie);
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


