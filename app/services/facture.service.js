const factureDb = require('../db/factures-db')
const { Facture, FactureDetail } = require('../models/facture')

function getUserResume(user){
    return `"${user.name}" <${user.email}>`
}

function getVoitureResume(voiture){
    return `${voiture.numImmatricul} | ${voiture.marque} ${voiture.modele}`
}

function reparationToDetailsFacture(reparation){
    const details = []
    if(reparation.montantPrestation > 0)
        details.push(new FactureDetail(
            `${reparation.description} - ${reparation.designationPrestation}`,reparation.montantPrestation
        ))
    if(reparation.montantAchat > 0)
        details.push(new FactureDetail(
            `${reparation.description} - ${reparation.designationAchat}`,reparation.montantAchat
        ))
    return details
}

module.exports = {
    generateFacture: function(entree,user, remise = 0.0){
        const facture = new Facture(
            user._id,
            entree._id,
            getUserResume(user),
            getVoitureResume(entree.voiture[0]),
            entree.dateEntree,
            entree.dateSortie,
            entree.designation,
            Date.now(),
            remise
        )
        if(Array.isArray(entree.reparations)){
            entree.reparations.forEach(reparation => {
                facture.details.push(...reparationToDetailsFacture(reparation))
            });
        }
        facture.getTotalHT()
        facture.getTotalTTC()
        factureDb.saveOne(facture)
    }
}