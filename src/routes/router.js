const express = require('express');
const usersRouter = require('./users.routes.js');

const apiRoute = express();

apiRoute.use('/user', usersRouter);

module.exports = apiRoute;
