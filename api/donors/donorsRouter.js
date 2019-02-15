const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { jwtKey } = require('../../auth/authenticate.js');

const db = require('./donorsHelpers.js');

const donorsRouter = express.Router();

function generateToken(donor) {
    const payload = {
        username: donor.username
    };
    const options = {
        expiresIn: '1h'
    };
    return jwt.sign(payload, jwtKey, options);
}

donorsRouter.get('/', async (req, res) => {
    const rows = await db.getAll();
    res
        .status(200)
        .json(rows);
});

donorsRouter.get('/:id', async (req, res) => {
    const { id } = req.params;
    const donor = await db.getDonorById(id);
    if (donor.length > 0) {
        res
            .status(200)
            .json(donor[0]);
    }
    else {
        res
            .status(404)
            .json({ message: 'Not found.' });
    }
});

donorsRouter.post('/register', async (req, res) => {
    const newDonor = req.body;
    if (newDonor.username && newDonor.password) {
        const dupeUsername = await db.checkForUsername(newDonor);
        if (dupeUsername.length > 0) {
            res
                .status(422)
                .json({message: 'Username already exists.'});
        }
        else {
            const hash = bcrypt.hashSync(newDonor.password, 14);
            newDonor.password = hash;
            const ids = await db.addDonor(newDonor);
            if (ids) {
                const id = ids[0];
                const donor = await db.getDonorById(id)
                if (donor) {
                    const token = generateToken(donor);
                    if (token) {
                        res
                            .status(201)
                            .send(token);
                    }
                    else {
                        res
                            .status(500)
                            .json({message: 'Error generating token. The Donor could not be added at this time.'});
                    }
                }
                else {
                    res
                        .status(500)
                        .json({message: 'Error finding Donor in database. The Donor could not be added at this time.'}); 
                }    
            }
            else {
                res
                    .status(500)
                    .json({message: 'Error adding Donor to database. The Donor could not be added at this time.'});
            }
        }
    }
    else {
        res
            .status(422)
            .json({ message: 'Missing username or password.'});
    }
});

donorsRouter.post('/login', async (req, res) => {
    const creds = req.body;
    if (creds.username && creds.password) {
        const donor = await db.checkForUsername(creds);
        if (donor.length > 0) {
            if (bcrypt.compareSync(creds.password, donor[0].password)) {
                const token = generateToken(donor);
                res
                    .send(token);
            }
            else {
                res
                    .status(401)
                    .json({message: 'Incorrect username or password.'});
            }
        }
        else {
            res
                .status(401)
                .json({message: 'Incorrect username or password.'});
        }
    }
    else {
        res
            .status(422)
            .json({ message: 'Missing username or password.' });
    }
});


module.exports = donorsRouter;