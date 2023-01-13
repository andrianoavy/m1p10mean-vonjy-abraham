const jwt = require('jsonwebtoken');
require('dotenv').config();

function checkJwt {
    console.log('checking role ...');
    return checkJwt || (checkJwt =
        function(req, res, next) {

            //Get the jwt token from the head
            let token = req.headers["Authorization"];

            if (!token) {
                return res.status(401).send({
                    status: "Error",
                    message: "no token"
                })
            }
            token = token.replace("Bearer", "");

            let jwtPayLoad;
            //Try to validate the token and get data
            try {
                jwtPayLoad = jwt.verify(token, "SECRET??");
                res.locals.jwtPayLoad = jwtPayLoad;
            } catch (error) {
                return res.status(401).send({
                    status: "Error",
                    message: "no token"
                })
            }


            //The token is valid for 1 hour
            //We want to send a new token on every request
            const { userId, username } = jwtPayload;
            const newToken = jwt.sign({ userId, username }, "SECRET??", {
                expiresIn: "1h",
            });
            res.setHeader("token", newToken);

            next();
        })
}

module.exports = checkJwt;