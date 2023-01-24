const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const bodyParser = require('body-parser')

const recordRoutes = require('express').Router()

const { Entree } = require('../models/entree')
const { Reparation } = require('../models/reparation')

const entreeDb = require('../db/entrees-db')

const checkJwt = require('../middlewares/checkJwt')
const checkRole = require('../middlewares/checkRole')

const baseRoute = '/api'

let { AllUsers, Client, ClientAtelier, ClientFinancier, Atelier, Financier, Atelierfinancier } = require('../utils/role');

recordRoutes.post('/api/atelier/entree', /*checkJwt, checkRole(Atelier),*/ (req, res) => {
    const newEntree = new Entree(
        req.body.designation, req.body.dateEntree, req.body.dateSortie, req.body.voitureId, []
    );

    entreeDb.saveOne(newEntree)
        .then((entree) => {
            if (!entree) {
                return res.status(401).json({
                    message: 'Enregistrement échouée',
                })
            }
            res.status(200).json({
                status: "Success",
                data: entree
            })
        }).catch((err) => {
            console.log(err.errInfo.details.schemaRulesNotSatisfied[0].propertiesNotSatisfied);
            throw new Error(err)
            return res.status(401).json({
                message: 'Enregistrement de l\'information échouée',
            })
        })
})


recordRoutes.post('/api/atelier/reparation', /*checkJwt, checkRole(Atelier),*/ (req, res) => {
    // let newReparation;
    // let reparationId;
    // entreeDb.getValueForNextSequence('item_id')
    //     .then((idSeq) => {
    //         reparationId = idSeq;
    //     }).catch((err) => {
    //         return res.status(401).json({
    //             message: 'id not found',
    //         })
    //     })

    const newReparation = new Reparation(
        1, req.body.description, req.body.designationPrestation, req.body.montantPrestation, req.body.designationAchat, req.body.montantAchat, req.body.dateDebut, req.body.dateFin, "En attente"
    );

    entreeDb.saveReparation(req.body.entreeId, newReparation)
        .then((reparation) => {
            if (!reparation) {
                return res.status(401).json({
                    message: 'Enregistrement échouée',
                })
            }
            res.status(200).json({
                status: "Success",
                data: reparation
            })
        }).catch((err) => {
            res.status(401).json({
                message: 'Enregistrement de l\'information échouée',
            })
            throw err;
        })
})

recordRoutes.get('/api/atelier/entrees', /*checkJwt, checkRole(Atelier),*/ (req, res) => {
    entreeDb.findEntreeWithCar()
    // entreeDb.getAll()
        .then((entree) => {
            if (!entree) {
                return res.status(401).json({
                    message: 'Pas de resultat',
                })
            }
            res.status(200).json({
                status: "Success",
                data: entree
            })
        }).catch((err) => {
            throw new Error(err)
            return res.status(401).json({
                message: 'error',
            })
        })
})


recordRoutes.get('/api/atelier/entrees/car', checkJwt, checkRole(Atelier), (req, res) => {
    entreeDb.findEntreeWithCar()
        .then((entree) => {
            if (!entree) {
                return res.status(401).json({
                    message: 'Pas de resultat',
                })
            }
            res.status(200).json({
                status: "Success",
                data: entree
            })
        }).catch((err) => {
            return res.status(401).json({
                message: 'error',
            })
        })
})

recordRoutes.get('/api/atelier/entree/reparations', checkJwt, checkRole(Atelier), (req, res) => {

    entreeDb.getAllReparationByEntree(req.query.id)
        .then((reparation) => {
            if (!reparation) {
                return res.status(401).json({
                    message: 'Impossible de touver des reparations',
                })
            }
            res.status(200).json({
                status: "Success",
                data: reparation
            })
        }).catch((err) => {
            return res.status(401).json({
                message: 'Impossible de touver des reparations',
            })
        })
})

module.exports = recordRoutes;