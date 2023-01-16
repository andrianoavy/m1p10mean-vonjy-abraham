const usersDb = require('../Db/sales-db')

function checkRole(roles) {
    console.log('checking role ...');
    return checkRole[roles] || (checkRole[roles] =
        function(req, res, next) {
            const id = req.jwtPayLoad.userId;


            usersDb.getOneById(id)
                .then((result) => {
                        // user_role = result.role
                        let isValid = false;
                        for (var role of roles) {
                            if (role == result.role) {
                                isValid = true;
                            }
                        }

                        if (isValid) {
                            next();
                        } else {
                            res.status(400).send("Error fetching document!")
                        }
                    }

                )
                .catch((err) => {
                    console.log(err);
                    res.status(400).send("Error fetching document!")
                })



        }
    );
}

module.exports = checkRole;