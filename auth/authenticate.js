const jwt = require('jsonwebtoken');
require('dotenv').config();

const jwtKey = process.env.JWT_SECRET;

function protect (req, res, next) {
    const token = req.headers.authorization;
    
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

module.exports = {
    jwtKey,
    protect
}