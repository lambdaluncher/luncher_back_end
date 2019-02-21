const express = require('express');

const db = require('./donorViewHelpers.js');

const donorViewRouter = express.Router();

// GET /donorView

donorViewRouter.get('/', async (req, res) => {
    const rows = await db.getAll();
    if (rows.length > 0) {
        res
            .status(200)
            .json(rows);
    }
    else {
        res
            .status(500)
            .json({message: 'There was an error retrieving the schools data.'});
    }
});

module.exports = donorViewRouter;