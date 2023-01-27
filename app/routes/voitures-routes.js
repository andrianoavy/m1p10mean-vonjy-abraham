const recordRoutes = require('express').Router()

const { ObjectId } = require('mongodb');
const db = require('../db/voitures-db');
const entreeDb = require('../db/voitures-db');

const authorize = require('../middlewares/auth-middlewares');
const checkJwt = require('../middlewares/checkJwt');
const checkRole = require('../middlewares/checkRole');
const ClientRole = require('../utils/role').Client
const { Voiture } = require('../models/voiture');

const baseRoute = '/api/voitures'

// recordRoutes.get(`${baseRoute}/test`,function(req,res){
//     db.findAllWithLastEntree({}).then(
//         data => {
//             res.json(data) 
//         }
//     )
// })

recordRoutes.get(`${baseRoute}/client/:immatriculation`, checkJwt,checkRole(ClientRole), function (req, res) {

    const immatriculation = req.params.immatriculation
    const userId = req.jwtPayLoad.userId
    db.findOneWithEntree({_idUser:new ObjectId(userId), numImmatricul:immatriculation})
    .then((data)=>{
        if(Array.isArray(data))
            res.json(data[0]);
    })
    .catch((err)=> {
        res.status(500).send("Erreur du server")
        throw err;
    });    
});

recordRoutes.get(`${baseRoute}/client/historique/:immatriculation`, checkJwt,checkRole(ClientRole), function (req, res) {

    const immatriculation = req.params.immatriculation
    const userId = req.jwtPayLoad.userId
    let page = req.query["page"] || 0;
    let itemCount = req.query["itemCount"] || 10;
    
    db.findVoitureWithHistorique({_idUser:new ObjectId(userId), numImmatricul:immatriculation},page,itemCount)
    .then((data)=>{
        if(data)
            res.json(data);
    })
    .catch((err)=> {
        res.status(500).send("Erreur du server")
        throw err;
    });    
});

recordRoutes.get(`${baseRoute}`, authorize, function (req, res) {

    const idUser = req.payload.userId

    if (req.query.search) {
        db.searchByClientWithLE(idUser, req.query.search.trim())
            .then((result) => {
                return res.json(result);
            })
            .catch((err) => {
                console.log(err);
                res.status(400).send("Error fetching listings!")
            })
        return;
    }

    db.findAllWithLastEntree(idUser)
        .then((result) => res.json(result))
        .catch((err) => {
            console.log(err);
            res.status(400).send("Error fetching listings!")
        })
});

recordRoutes.get('/api/voitures/all', authorize, function (req, res) {
    db.findAll()
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