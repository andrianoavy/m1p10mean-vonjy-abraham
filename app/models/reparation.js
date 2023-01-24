const { Double } = require("mongodb");

module.exports = {
    Reparation: class {
        constructor(reparationId, description, designationPrestation, montantPrestation, designationAchat, montantAchat, dateDebut, dateFin, Etat) {
            this.reparationId = reparationId;
            this.description = description;
            this.designationPrestation = designationPrestation;
            this.montantPrestation = new Double(montantPrestation);
            this.designationAchat = designationAchat;
            this.montantAchat = new Double(montantAchat);
            this.dateDebut = new Date(dateDebut);
            if (dateFin)
                this.dateFin = new Date(dateFin);
            this.Etat = Etat;
        }
    }
}