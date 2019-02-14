const db = require('../../data/dbConfig.js');

module.exports = {
    getAll,
    addAdmin,
    getAdminById
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