const express = require('express');

const db = require('./schoolsHelpers.js');
const { protect } = require('../../auth/authenticate.js');

const schoolsRouter = express.Router();

// in order to get GET /schools, need to send token to API

schoolsRouter.get('/', protect, async (req, res) => {
    const rows = await db.getAll();
    if (rows.length > 0) {
        res
            .status(200)
            .json(rows);
    }
    else {
        res
            .status(500)
            .json({message: 'There was an error retrieving the schools data.'})
    }
});

schoolsRouter.get('/:id', protect, async (req, res) => {
    const { id } = req.params;
    const school = await db.getSchoolById(id);
    if (school.length > 0) {
        res
            .status(200)
            .json(school[0]);
    }
    else {
        res
            .status(404)
            .json({ message: 'Not found.'});
    }
});

schoolsRouter.post('/', protect, async (req, res) => {
    const newSchool = req.body;
    if (newSchool.schoolName) {
        const dupeSchoolName = await db.checkForSchoolName(newSchool);
        if (dupeSchoolName.length > 0) {
            res
                .status(400)
                .json({message: 'School name already exists.'});
        }
        else {
            const ids = await db.addSchool(newSchool);
            if (ids) {
                res
                    .status(201)
                    .json(ids)
            } 
            else {
                res
                    .status(500)
                    .json({ message: 'Database error. School could not be added at this time.'});
            }
        }
    }
    else {
        res
            .status(422)
            .json({ message: 'Please provide the school name.'})
    }
});

schoolsRouter.put('/:id', protect, async (req, res) => {
    const { id } = req.params;
    const changes = req.body;
    const schoolUpdated = await db.updateSchool(id, changes);
    if (schoolUpdated) {
        res
            .status(201)
            .json({ message: 'The school was successfully updated.'});
    }
    else {
        res
            .status(500)
            .json({ message: 'Database error. The school information could not be updated at this time.'});
    }
});

schoolsRouter.delete('/:id', protect, async (req, res) => {
    const { id } = req.params;
    const schoolDeleted = await db.deleteSchool(id);
    if (schoolDeleted) {
        res
            .status(202)
            .json({ message: 'The school information was deleted.'});
    }
    else {
        res
            .status(500)
            .json({ message: 'The school information could not be deleted at this time.'});
    }
});

module.exports = schoolsRouter;