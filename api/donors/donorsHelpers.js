const db = require('../../data/dbConfig.js');

module.exports = {
    getAll
}

async function getAll() {
    return db('donors');
}