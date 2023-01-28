const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const bodyParser = require('body-parser')
const clientRole = require('../utils/role').Client

const recordRoutes = require('express').Router()

const userDb = require('../db/users-db')
const { User } = require('../models/user')

const checkJwt = require('../middlewares/checkJwt')
const checkRole = require('../middlewares/checkRole')

const baseRoute = '/api/auth'

let { AllUsers, Client, ClientAtelier, ClientFinancier, Atelier, Financier, Atelierfinancier } = require('../utils/role');

//inscription
recordRoutes.route(`${baseRoute}/inscription`).post(async function(req, res) {
    //TODO:Vérifier les champs

    //Crypter le mot de passe
    bcrypt.hash(req.body.password, 10).then((hash) => {
        const user = new User(
            req.body.name,
            hash,
            req.body.email,
            //Hard coder le client
            req.body.role || "Client"
        );
        user.telephone = req.body.telephone,
        user.adresse = req.body.adresse
        userDb.saveOne(user)
            .then((result) => res.json(result))
            .catch((err) => {
                console.log('Erreur ' + err);
                console.log( err.errInfo);
                return res.status(400).send("Erreur lors de l'insertion de l'utilisateur!")
            })
    })
})

//login
recordRoutes.route(`${baseRoute}/login`).post((req, res) => {
    let getUser
    userDb
        .findOne({
            email: req.body.email,
        })
        .catch((err) => {  
            console.Error(err)          
            throw new Error(`Erreur lors de la recherche de l'email '${req.body.email}'`)
        })
        .then((user) => {
            if (!user) {
                throw new Error(`Pas de mail correspondant à '${req.body.email}'`)
            }
            getUser = user
            return bcrypt.compare(req.body.password, user.password)
        })
        .then((response) => {
            if (!response) {
                throw new Error(`Erreur lors de la comparaison des MdP`)
            }
            let jwtToken = jwt.sign({
                    name: getUser.nom,
                    userId: getUser._id,
                },
                process.env.JWT_TOKEN_SECRET, {
                    expiresIn: '1h',
                },
            )
            return res.status(200).json({
                token: jwtToken,
                expiresIn: 3600,
                _id: getUser._id,
                role: getUser.role
            })
        })
        .catch((err) => {
            res.status(401).json({
                message: 'Authentication failed',
            })
            console.error(err);
        })
})


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