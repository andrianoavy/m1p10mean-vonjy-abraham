const {Double,ObjectId} = require('bson')
module.exports = {
    Paiement:class{
        constructor(paiement){
            this.montant = new Double(paiement.montant)
            this.valid = false
            this.methode = paiement.methode
            this.idFacture = new ObjectId(paiement.idFacture)
            this.client = paiement.client
            this.apayer = paiement.montant
            this.dateFacture = new Date(paiement.dateFacture)
            this.datePaiement = new Date(Date.now())
        }
    }
}