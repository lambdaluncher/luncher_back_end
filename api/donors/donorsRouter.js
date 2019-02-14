const express = require('express');

const donorsRouter = express.Router();

const db = require('./donorsHelpers.js');

donorsRouter.get('/', async (req, res) => {
    const rows = await db.getAll();
    res
        .status(200)
        .json(rows);
});

module.exports = donorsRouter;