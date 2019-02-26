const express = require('express');
const cors = require('cors');
require('dotenv').config();

const adminsRouter = require('./api/admins/adminsRouter.js');
const donorsRouter = require('./api/donors/donorsRouter.js');
const schoolsRouter = require('./api/schools/schoolsRouter.js');
const donorViewRouter = require('./api/donorView/donorViewRouter.js');


// const port = 4040; 
const server = express();

server.use(cors());
server.use(express.json());

server.use('/admins', adminsRouter);
server.use('/donors', donorsRouter);
server.use('/schools', schoolsRouter);
server.use('/donorView', donorViewRouter);

server.listen(port, err => {
    console.log(`Server is running on port 4040`);
});

module.exports = server;