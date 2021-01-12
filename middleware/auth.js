/** Middleware for handling request authorization for routes. */

const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../config");

function authenticateJWT(req, res, next) {
    try {
        const token = req.cookies['token'];
        console.log(token);
        const payload = jwt.verify(token, SECRET_KEY);
        req.user = payload;
        return next();
    } catch(err) {
        return next();
    }
}

module.exports = authenticateJWT; 