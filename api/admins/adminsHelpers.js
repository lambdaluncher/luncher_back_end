const db = require('../../data/dbConfig.js');

module.exports = {
    getAll,
    addAdmin,
    getAdminById,
    checkForUsername
};

async function getAll() {
    return db('admins');
};

async function addAdmin(newAdmin) {
    return db('admins')
        .insert(newAdmin);
};

async function getAdminById(id) {
    return db('admins')
        .where('id', Number(id));
};

async function checkForUsername(newAdmin) {
    return db('admins')
        .where('username', newAdmin.username)
}