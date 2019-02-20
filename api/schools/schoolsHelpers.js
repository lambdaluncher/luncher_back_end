const db = require('../../data/dbConfig.js');

module.exports = {
    getAll,
    addSchool,
    getSchoolById,
    updateSchool,
    deleteSchool,
    checkForSchoolName
}

async function getAll() {
    return db('schools');
};

async function addSchool(newSchool) {
    return db('schools')
        .insert(newSchool);
};

async function checkForSchoolName(newSchool) {
    return db('schools')
        .where('schoolName', newSchool.schoolName);
}

async function getSchoolById(id) {
    return db('schools')
        .where('id', Number(id));
};

async function updateSchool(id, changes) {
    return db('schools')
        .where('id', Number(id))
        .update(changes)

}

async function deleteSchool(id) {
    return db('schools')
        .where('id', Number(id))
        .del();
}