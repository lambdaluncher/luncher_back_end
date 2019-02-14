const db = require('../../data/dbConfig.js');

module.exports = {
    getAll,
    addAdmin,
    getAdminById,
    checkForDupe
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

async function checkForDupe(newAdmin) {
    return db('admins')
        .where('username', newAdmin.username)
        .select('id');
}