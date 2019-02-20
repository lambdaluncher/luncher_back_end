const db = require('../../data/dbConfig.js');

module.exports = {
    getAll,
    addDonor,
    getDonorById,
    checkForUsername
}

async function getAll() {
    return db('donors');
}

async function addDonor(newDonor) {
    return db('donors')
        .insert(newDonor);
};

async function getDonorById(id) {
    return db('donors')
        .where('id', Number(id));
};

async function checkForUsername(newDonor) {
    return db('donors')
        .where('username', newDonor.username)
}