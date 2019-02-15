const express = require('express');

const db = require('./schoolsHelpers.js');

const schoolsRouter = express.Router();

schoolsRouter.get('/', async (req, res) => {
    const rows = await db.getAll();
    res
        .status(200)
        .json(rows);
});

schoolsRouter.get('/:id', async (req, res) => {
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

schoolsRouter.post('/', async (req, res) => {
    const newSchool = req.body;
    if (newSchool.schoolName) {
        const dupeSchoolName = await db.checkForSchoolName(newSchool);
        if (dupeSchoolName.length > 0) {
            res
                .status(422)
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

schoolsRouter.put('/:id', async (req, res) => {
    const { id } = req.params;
    const changes = req.body;
    const updatedSchool = await db.updateSchool(id, changes);
    if (updatedSchool) {
        console.log(updatedSchool);
        res
            .status(201)
            .json({ message: 'The school information was updated'});
    }
    else {
        res
            .status(500)
            .json({ message: 'Database error. The school information could not be updated at this time.'});
    }
});

module.exports = schoolsRouter;