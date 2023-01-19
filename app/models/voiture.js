
const { ObjectId } = require('mongodb')

module.exports = {
  Voiture: class {
    _idUser;
    set idUser(value){
      this._idUser = new ObjectId(value)
    };
    get idUser(){
      return this._idUser
    };
    numImmatricul;
    marque;
    modele;
    constructor(numImmatricul, marque, modele) {
      this.numImmatricul = numImmatricul;
      this.marque = marque;
      this.modele = modele;
    }
  },
  collectionName: "Voitures",
  options: {
    validator: {
      $jsonSchema: {
        bsonType: "object",
        title: "Voiture validation",
        required: ["_idUser", "numImmatricul", "marque", "modele"],
        properties: {
          _idUser: {
            bsonType: "objectId",
            description: "'idUser' doit être du type ObjectId"
          },
          numImmatricul: {
            bsonType: "string",
            description: "'numImmatricul' doit être une chaîne de charactères et est requis"
          },
          marque: {
            bsonType: "string",
            description: "'marque' doit être une chaîne de charactères et est requis"
          },
          modele: {
            bsonType: "string",
            description: "'modele' doit être une chaîne de charactères et est requis"
          },
        }
      }
    } 
  },
  indexes: [{ indexInfo: { "_idUser": 1 } }, { indexInfo: { "numImmatricul": "text" }, isUnique: true }],
  // TODO Travailler sur Implémentation de findWithLookup: avec ID, avec where et findOne 
  lookups: [
    {
      $lookup:
      {
        from: "Users",
        localField: "_idUser",
        foreignField: "_id",
        as: "user"
      }
    },
  ],
}