const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { jwtKey } = require('../../auth/authenticate.js');

const db = require('./adminsHelpers.js');

const adminsRouter = express.Router();

function generateToken(admin) {
    const payload = {
        username: admin.username
    };
    const options = {
        expiresIn: '1h'
    };
    return jwt.sign(payload, jwtKey, options);
}

adminsRouter.get('/', async (req, res) => {
    const rows = await db.getAll();
    res
        .status(200)
        .json(rows);
});

adminsRouter.get('/:id', async (req, res) => {
    const { id } = req.params;
    const admin = await db.getAdminById(id);
    if (admin.length > 0) {
        res
            .status(200)
            .json(admin[0]);
    }
    else {
        res
            .status(404)
            .json({ message: 'Not found.' });
    }
});

adminsRouter.post('/register', async (req, res) => {
    const newAdmin = req.body;
    if (newAdmin.username && newAdmin.password) {
        const dupeUsername = await db.checkForUsername(newAdmin);
        if (dupeUsername.length > 0) {
            res
                .status(422)
                .json({message: 'Username already exists.'});
        }
        else {
            const hash = bcrypt.hashSync(newAdmin.password, 14);
            newAdmin.password = hash;
            const ids = await db.addAdmin(newAdmin);
            if (ids) {
                const id = ids[0];
                const admin = await db.getAdminById(id)
                if (admin) {
                    const token = generateToken(admin);
                    if (token) {
                        res
                            .status(201)
                            .send({ token });
                    }
                    else {
                        res
                            .status(500)
                            .json({message: 'Error generating token. The Admin could not be added at this time.'});
                    }
                }
                else {
                    res
                        .status(500)
                        .json({message: 'Error finding Admin in database. The Admin could not be added at this time.'}); 
                }    
            }
            else {
                res
                    .status(500)
                    .json({message: 'Error adding Admin to database. The Admin could not be added at this time.'});
            }
        }
    }
    else {
        res
            .status(422)
            .json({ message: 'Missing username or password.'});
    }
});

adminsRouter.post('/login', async (req, res) => {
    const creds = req.body;
    if (creds.username && creds.password) {
        const admin = await db.checkForUsername(creds);
        if (admin.length > 0) {
            if (bcrypt.compareSync(creds.password, admin[0].password)) {
                const token = generateToken(admin);
                res
                    .status(201)
                    .send({ token });
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


module.exports = adminsRouter;