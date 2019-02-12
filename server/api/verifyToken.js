var jwt = require('jsonwebtoken');
var config = require('../config');


function validateRequest(userType = '') {

    var middleware = function verifyToken(req, res, next) {
        var token = req.headers['x-access-token'];
        console.log("token:", token);
        if (!token)
            return res.status(403).send({ auth: false, message: 'No token provided.' });
        jwt.verify(token, config.secret, function (err, decoded) {
            if (err)
                return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
            // if everything good, save to request for use in other routes
            console.log(userType, decoded);
            if ((userType == 'admin') && (userType != decoded.type)) {
                return res.status(500).send({ auth: false, message: 'User do not have rights to access this resource.' });
            }
            req.userId = decoded.id;
            req.userType = decoded.type;
            next();
        });
    }

    return middleware;
}

module.exports = validateRequest;