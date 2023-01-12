const recordRoutes = require('express').Router()

const usersDb = require('../Db/sales-db');
const checkRole = require('../middleware/checkRole');

const { financier, atelier } = require('../utils/role');

const baseRoute = '/api'

recordRoutes.get('/api/users', checkRole(['FINANCIER']), function(req, res) {
    console.log('/sales GET works!💯');
    usersDb.getAll()
        .then((result) => res.json(result))
        .catch((err) => {
            console.log(err);
            res.status(400).send("Error fetching listings!")
        })
});

recordRoutes.route(`${baseRoute}/user/:id`).get(async function(req, res) {
    const id = req.params['id']
    console.log('/sales GET works!💯 id = ' + id);
    usersDb.getOneById(id)
        .then((result) => res.json(result))
        .catch((err) => {
            console.log(err);
            res.status(400).send("Error fetching document!")
        })
})

recordRoutes.route('/api/sale').post(async function(req, res) {
    console.log('/sales GET works!💯');
    sale = req.body;
    usersDb.saveOne(sale)
        .then(() => res.json(sale))
        .catch((err) => {
            console.log(err);
            res.status(400).send("Error fetching document!")
        })
})

module.exports = recordRoutes;