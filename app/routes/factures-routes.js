const recordRoutes = require('express').Router()
const db = require('../db/factures-db')

const checkJwt = require('../middlewares/checkJwt');
const checkRole = require('../middlewares/checkRole');
const ClientRole = require('../utils/role').Client

const baseRoute = '/api/factures'

recordRoutes.get(baseRoute,checkJwt,checkRole(ClientRole),
    function(req,res){
        let showPaid = false || req.query.showPaid
        let search = null || req.query.search
        let page = null || req.query.page
        let itemCount = null || req.query.itemCount

        const idUser = req.jwtPayLoad.userId

        db.findAllFactures(idUser, {showPaid, search, page, itemCount}).then(
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