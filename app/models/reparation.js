module.exports = {
    Raparation: class {
        constructor(reparationId, description, designationPrestation, montantPrestation, designationAchat, montantAchat, dateDebut, dateFin, Etat) {
            this.reparationId = reparationId;
            this.description = description;
            this.designationPrestation = designationPrestation;
            this.montantPrestation = montantPrestation;
            this.designationAchat = designationAchat;
            this.montantAchat = montantAchat;
            this.dateDebut = dateDebut;
            this.dateFin = dateFin;
            this.Etat = Etat;
        }
    }
}