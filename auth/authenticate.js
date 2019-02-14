const jwt = require('jsonwebtoken');
require('dotenv').config();

const jwtKey = process.env.JWT_SECRET;

module.exports = {
    jwtKey
}