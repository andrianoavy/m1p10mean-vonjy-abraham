const recordRoutes = require('express').Router()

const db = require('../db/voitures-db');

const authorize = require('../middlewares/auth-middlewares');
const { Voiture } = require('../models/voiture');

const baseRoute = '/api/voitures'

recordRoutes.get(`${baseRoute}`, authorize, function (req, res) {



    const idUser = req.payload.userId

    if (req.query.search) {
        db.findAllSearchByClient(idUser,req.query.search.trim())
            .then((result) => {
                return res.json(result);
            })
            .catch((err) => {
                console.log(err);
                res.status(400).send("Error fetching listings!")
            })
            return;
    }

    db.findAllByClient(idUser)
        .then((result) => res.json(result))
        .catch((err) => {
            console.log(err);
            res.status(400).send("Error fetching listings!")
        })
});

recordRoutes.post(`${baseRoute}`, authorize, function (req, res) {

    const voiture = new Voiture(
        req.body.numImmatricul,
        req.body.marque,
        req.body.modele,
    );

    voiture.idUser = req.payload.userId

    db.saveOne(voiture)
        .then((result) => res.json(result))
        .catch((err) => {
            console.log(err);
            res.status(400).send(`Erreur lors de l'enregistrement de la voiture: ${err}`)
        })
});

module.exports = recordRoutes;