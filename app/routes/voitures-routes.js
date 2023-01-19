const recordRoutes = require('express').Router()

const db = require('../db/voitures-db');

const authorize = require('../middlewares/auth-middlewares');
const { Voiture } = require('../models/voiture');

const baseRoute = '/voitures'

recordRoutes.get(`${baseRoute}`, authorize ,function(req, res) {
    
    db.findAllByClient('63c520f549d69a811c19eea7')
        .then((result) => res.json(result))
        .catch((err) => {
            console.log(err);
            res.status(400).send("Error fetching listings!")
        })
});

recordRoutes.get('/voitures/all',authorize,function(req,res){
    db.findAll()
    .then((result) => res.json(result))
    .catch((err) => {
        console.log(err);
        res.status(400).send("Error fetching listings!")
    })
});

recordRoutes.post(`${baseRoute}`, authorize ,function(req, res) {
    
    const voiture = new Voiture(
        req.body.idClient,
        req.body.numImmatricul,
        req.body.marque,
        req.body.modele,
    );

    db.saveOne(voiture)
        .then((result) => res.json(result))
        .catch((err) => {
            console.log(err);
            res.status(400).send("Error fetching listings!")
        })
});

module.exports = recordRoutes;