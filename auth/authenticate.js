const jwt = require('jsonwebtoken');
require('dotenv').config();

const jwtKey = process.env.JWT_SECRET;

function protect (req, res, next) {
    const token = req.headers.authorization;
    if ( token ) {
        jwt.verify(token, jwtKey, (err, decodedToken) => {
            if (err) {
                res
                    .status(401)
                    .json({ message: 'Invalid token.'});
            }
            else {
                next();
            }
        });
    }
    else {
        res
            .status(401)
            .json({ message: 'No token provided.'})
    }
}

module.exports = {
    jwtKey,
    protect
}