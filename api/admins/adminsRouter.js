const express = require('express');

const adminsRouter = express.Router();

const db = require('./adminsHelpers.js');

adminsRouter.get('/', async (req, res) => {
    const rows = await db.getAll();
    res
        .status(200)
        .json(rows);
});

module.exports = adminsRouter;