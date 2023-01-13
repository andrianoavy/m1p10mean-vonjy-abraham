const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const bodyParser = require('body-parser')

const recordRoutes = require('express').Router()

const userDb = require('../db/users-db') 
const { User } = require('../models/user')

const baseRoute = '/auth'

//inscription
recordRoutes.route(`${baseRoute}/inscription`).post(async function (req, res) {
    //TODO:Vérifier les champs

    bodyParser
    //Crypter le mot de passe
    bcrypt.hash(req.body.password, 10).then((hash) => {
        const user = new User(
          req.body.name,
          hash,
          req.body.email,
          //Hard coder le client
          req.body.role || "Client"
        );
        userDb.saveOne(user)
        .then((result) => res.json(result))
        .catch((err) => {
            console.log('Erreur '+err);
            console.log('Erreur Info '+err.errInfo);
            return res.status(400).send("Erreur lors de l'insertion de l'utilisateur!")
            }
        )
        })
})

//login
recordRoutes.route(`${baseRoute}/login`).post((req, res) => {
    let getUser
    userDb
      .findOne({
        email: req.body.email,
      })
      .then((user) => { 
        if (!user) {
          return res.status(401).json({
            message: 'Authentification échouée',
          })
        }
        getUser = user
        return bcrypt.compare(req.body.password, user.password)
      })
      .then((response) => {
        if (!response) {
          return res.status(401).json({
            message: 'Authentification échouée',
          })
        }
        let jwtToken = jwt.sign(
          {
            name: getUser.name,
            userId: getUser._id,
          },
          process.env.JWT_TOKEN_SECRET||'TsiAmBarATelOn\'ny t0kenaKo',
          {
            expiresIn: '1h',
          },
        )
        res.status(200).json({
          token: jwtToken,
          expiresIn: 3600,
          _id: getUser._id,
        })
      })
      .catch((err) => {
        return res.status(401).json({
          message: 'Authentication failed',
        })
      })
  })

module.exports = recordRoutes;