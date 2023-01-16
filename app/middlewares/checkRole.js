const usersDb = require('../Db/sales-db')

function checkRole(roles) {
    console.log('checking role ...');
    return checkRole[roles] || (checkRole[roles] =
        function(req, res, next) {

            // const id = res.locals.jwtPayload.userId;

            // let user;
            // usersDb.getOneById(user_id)
            //     .then((result) =>
            //         user = result
            //     )
            //     .catch((err) => {
            //         console.log(err);
            //         res.status(400).send("Error fetching document!")
            //     })

            // let user_role = user.role;
            let user_role = "CLIENT";

            let isValid = false;
            for (var role of roles) {
                if (role == user_role) {
                    isValid = true;
                }
            }

            if (isValid) {
                next();
            } else {
                res.status(400).send("Error fetching document!")
            }
        }
    );
}

module.exports = checkRole;