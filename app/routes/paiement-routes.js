const recordRoutes = require('express').Router()
const { ObjectId } = require('mongodb');
const db = require('../db/paiements-db')
const factureDb = require('../db/factures-db')

const checkJwt = require('../middlewares/checkJwt');
const checkRole = require('../middlewares/checkRole');
const ClientRole = require('../utils/role').Client
const FinanceRole = require('../utils/role').Financier
const {Paiement} = require('../models/paiement')

const baseRoute = '/api/paiement'

recordRoutes.post(baseRoute,checkJwt,checkRole(ClientRole),
    function(req,res){        

        const idUser = req.jwtPayLoad.userId

        factureDb.findOne({idUser:new ObjectId(idUser), _id:new ObjectId(req.body.idFacture)}).then(data => {
            if(data){
                db.saveOne(idUser, new Paiement(req.body)).then(
                    results => {
                        let response = results
                        factureDb.updateOne(data._id,{$set:{'paid':true}}).then(
                            result2 => res.json(result2)
                        ).catch(
                            (err)=>{
                                console.error(err)
                                res.status(500).json({message:"Erreur du serveur"})
                            }
                        )
                    }
                ).catch(
                    (err)=>{
                        console.error(err)
                        res.status(500).json({message:"Erreur du serveur"})
                    }
                )
            }
            else
                res.status(404).json({message:"Facture non trouvée"})
        }
        )
        

    }
)

recordRoutes.put(baseRoute,checkJwt,checkRole(FinanceRole),
function(req,res){
    db.valider(req.body.id).then(
        results => {
            res.json(results)
        }
    ).catch(
        (err)=>{
            console.error(err)
            res.status(500).json({message:"Erreur du serveur"})
        }
    )
})

recordRoutes.get(baseRoute,checkJwt,checkRole(FinanceRole),
    function(req,res){
        let showValid = false || JSON.parse(req.query.showValid)
        let search = null || req.query.search
        let page = null || req.query.page
        let itemCount = null || req.query.itemCount

        db.findAllPaiements( {showValid, search, page, itemCount}).then(
            results => {
                res.json(results)
            }
        ).catch(
            (err)=>{
                console.error(err)
                res.status(500).json({message:"Erreur du serveur"})
            }
        )

    }
)

module.exports = recordRoutes