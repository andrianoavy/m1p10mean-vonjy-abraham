const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        jwt.verify(token, process.env.JWT_TOKEN_SECRET || 'TsiAmBarATelOn\'ny t0kenaKo');
        req.payload = jwt.decode(token)
        next();
    } catch (error) {
        res.status(401).json({ message: "No token provided" });
    }
};