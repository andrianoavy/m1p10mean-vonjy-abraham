const usersDb = require('../Db/sales-db')

function checkRole(roles) {
    console.log('checking role ...');
    return checkRole[roles] || (checkRole[roles] =
        function(req, res, next) {
            // const user_id = '63c01ae430547190cf494c94';
            // let user;
            // usersDb.getOneById(user_id)
            //     .then((result) =>
            //         console.log(result))
            //     .catch((err) => {
            //         console.log(err);
            //         res.status(400).send("Error fetching document!")
            //     })
            user_role = 'FINANCIER'
            for (var role of roles) {
                if (role == user_role) {
                    next();
                } else {
                    res.status(400).send("Error fetching document!")
                }
            }
        }
    );
}

module.exports = checkRole;