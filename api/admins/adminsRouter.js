const express = require('express');

const adminsRouter = express.Router();

const db = require('./adminsHelpers.js');

adminsRouter.get('/', async (req, res) => {
    const rows = await db.getAll();
    res
        .status(200)
        .json(rows);
});

adminsRouter.get('/:id', async (req, res) => {
    const { id } = req.params;
    const admin = await db.getAdminById(id);
    if (admin) {
        res
            .status(200)
            .json(admin);
    }
    else {
        res
            .status(404)
            .json({ message: 'not found' });
    }
});

adminsRouter.post('/', async (req, res) => {
    const newAdmin = req.body;
    if (newAdmin.username && newAdmin.password) {
        const ids = await db.addAdmin(newAdmin);
        res
            .status(201)
            .json(ids);
    }
    else {
        res
            .status(422)
            .json({ message: 'missing username or password'});
    }
});



module.exports = adminsRouter;