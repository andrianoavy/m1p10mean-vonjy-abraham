const factureDb = require('../db/factures-db')
const { Facture, FactureDetail } = require('../models/facture')
const TYPE_DEVIS = require('../utils/type-devis')

function getUserResume(user){
    return `${user.name} <${user.email}>`
}

function getVoitureResume(voiture){
    return `${voiture.numImmatricul} | ${voiture.marque} ${voiture.modele}`
}

function reparationToDetailsFacture(reparation){
    const details = {
        achat:[],
        prestation:[]
    }
    if(reparation.montantPrestation > 0)
        details.achat.push(new FactureDetail(
            `${reparation.description} - ${reparation.designationPrestation}`,reparation.montantPrestation,TYPE_DEVIS.Prestation
        ))
    if(reparation.montantAchat > 0)
        details.prestation.push(new FactureDetail(
            `${reparation.description} - ${reparation.designationAchat}`,reparation.montantAchat,TYPE_DEVIS.Achat
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
                const details = reparationToDetailsFacture(reparation)
                facture.details.achat.push(...details.achat)
                facture.details.prestation.push(...details.prestation)
            });
        }
        facture.getTotalHT()
        facture.getTotalTTC()
        factureDb.saveOne(facture)
    }
}