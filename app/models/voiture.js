const {ObjectId} = require('mongodb')

module.exports = {
    Voiture : class {
        idClient;
        numImmatricul;
        marque;
        modele;
        constructor(idClient,numImmatricul,marque,modele){
            this.idClient = new ObjectId(idClient);
            this.numImmatricul = numImmatricul;
            this.marque = marque ;
            this.modele = modele ;

        }
    },
    indexes:[{indexInfo:{ "idClient": 1 }}]
}