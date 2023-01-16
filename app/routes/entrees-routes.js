const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const bodyParser = require('body-parser')

const recordRoutes = require('express').Router()

const entreeDb = require('../db/entrees-db')
const { Entree } = require('../models/entree')

const checkJwt = require('../middleware/checkJwt')
const checkRole = require('../middleware/checkRole')

const baseRoute = '/api'

let { AllUsers, Client, ClientAtelier, ClientFinancier, Atelier, Financier, Atelierfinancier } = require('../utils/role');

recordRoutes.get('/auth/allUser', checkJwt, checkRole(Client), (req, res) => {

    userDb.getAll()
        .then((user) => {
            if (!user) {
                return res.status(401).json({
                    message: 'Authentification échouée',
                })
            }
            res.status(200).json({
                users: user
            })
        }).catch((err) => {
            return res.status(401).json({
                message: 'failed',
            })
        })
})
module.exports = recordRoutes;