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

// WRITE THE FUNCTION TO CHECK FOR SCHOOL NAME
// WRITE THE FUNCTION TO CHECK FOR SCHOOL NAME
// WRITE THE FUNCTION TO CHECK FOR SCHOOL NAME
// WRITE THE FUNCTION TO CHECK FOR SCHOOL NAME
// WRITE THE FUNCTION TO CHECK FOR SCHOOL NAME
// WRITE THE FUNCTION TO CHECK FOR SCHOOL NAME
// WRITE THE FUNCTION TO CHECK FOR SCHOOL NAME

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
        .then(count => (count > 0 ? this.get(id) : null));
}

async function deleteSchool(id) {
    return db('schools')
        .where('id', Number(id))
        .del();
}