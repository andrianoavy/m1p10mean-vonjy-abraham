const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const bodyParser = require('body-parser')

const recordRoutes = require('express').Router()

const { Entree } = require('../models/entree')
const { Raparation } = require('../models/reparation')

const entreeDb = require('../db/entrees-db')

const checkJwt = require('../middleware/checkJwt')
const checkRole = require('../middleware/checkRole')

const baseRoute = '/api'

let { AllUsers, Client, ClientAtelier, ClientFinancier, Atelier, Financier, Atelierfinancier } = require('../utils/role');

recordRoutes.post('/api/atelier/entree', checkJwt, checkRole(Atelier), (req, res) => {
    const newEntree = new Entree(
        req.body.designation, req.body.dateEntree, req.body.dateSortie, req.body.voitureId, req.body.reparations
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
            return res.status(401).json({
                message: 'Enregistrement de l\'information échouée',
            })
        })
})


recordRoutes.post('/api/atelier/reparation', checkJwt, checkRole(Atelier), (req, res) => {
    const newReparation = new Raparation(
        1, req.body.description, req.body.designationPrestation, req.body.montantPrestation, req.body.designationAchat, req.body.montantAchat, req.body.dateDebut, req.body.dateFin, "En attente"
    );

    entreeDb.saveReparation("63c59882acb6d07a1fd32db3", newReparation)
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
            return res.status(401).json({
                message: 'Enregistrement de l\'information échouée',
            })
        })
})

recordRoutes.get('/api/atelier/entrees', checkJwt, checkRole(Atelier), (req, res) => {
    entreeDb.getAll()
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
            return res.status(401).json({
                message: 'Enregistrement de l\'information échouée',
            })
        })
})
module.exports = recordRoutes;