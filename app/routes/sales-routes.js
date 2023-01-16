const recordRoutes = require('express').Router()

const salesDb = require('../Db/sales-db')

const baseRoute = '/api'

recordRoutes.route('/api/sales').get(async function(req, res) {
    console.log('/sales GET works!💯');
    salesDb.getAll()
        .then((result) => res.json(result))
        .catch((err) => {
            console.log(err);
            res.status(400).send("Error fetching listings!")
        })
})

recordRoutes.route(`${baseRoute}/:id`).get(async function(req, res) {
    const id = req.params['id']
    console.log('/sales GET works!💯 id = ' + id);
    salesDb.getOneById(id)
        .then((result) => res.json(result))
        .catch((err) => {
            console.log(err);
            res.status(400).send("Error fetching document!")
        })
})

recordRoutes.route('/api/sale').post(async function(req, res) {
    console.log('/sales GET works!💯');
    sale = req.body;
    salesDb.saveOne(sale)
        .then(() => res.json(sale))
        .catch((err) => {
            console.log(err);
            res.status(400).send("Error fetching document!")
        })
})

module.exports = recordRoutes;