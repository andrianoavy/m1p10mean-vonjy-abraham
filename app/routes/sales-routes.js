const recordRoutes = require('express').Router()

const salesDb = require('../db/sales-db') 
const authorize = require('../middlewares/auth-middlewares') 

const baseRoute = '/api'

recordRoutes.route(baseRoute).get(authorize, async function (req, res) {
    console.log('/sales GET works!💯 haha');
    salesDb.getAll()
        .then((result) => res.json(result))
        .catch((err) => {
            console.log(err);
            res.status(400).send("Error fetching listings!")
        })
})

recordRoutes.route(`${baseRoute}/:id`).get(authorize,async function (req, res) {
    const id = req.params['id']
    console.log('/sales GET works!💯 id = ' + id);
    salesDb.getOneById(id)
        .then((result) => res.json(result))
        .catch((err) => {
            console.log(err);
            res.status(400).send("Error fetching document!")
        })
})

recordRoutes.route(baseRoute).post(authorize,async function (req, res) {
    console.log('/sales GET works!💯 ');
    sale = req.body;
    salesDb.saveOne(sale)
        .then(() => res.json(sale))
        .catch((err) => {
            console.log(err);
            res.status(400).send("Error fetching document!")
        })
})

module.exports = recordRoutes;