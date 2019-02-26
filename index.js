const express = require('express');
const cors = require('cors');
require('dotenv').config();
const PORT = process.env.PORT
const APP_URL = process.env.APP_URL
const adminsRouter = require('./api/admins/adminsRouter.js');
const donorsRouter = require('./api/donors/donorsRouter.js');
const schoolsRouter = require('./api/schools/schoolsRouter.js');
const donorViewRouter = require('./api/donorView/donorViewRouter.js');


const corsOptions = {
    origin: APP_URL,
    optionsSuccessStatus: 200
}
  
const server = express();

server.use(cors(corsOptions));
server.use(express.json());

server.use('/admins', adminsRouter);
server.use('/donors', donorsRouter);
server.use('/schools', schoolsRouter);
server.use('/donorView', donorViewRouter);

server.listen(PORT);

module.exports = server;