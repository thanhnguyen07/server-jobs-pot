const express = require('express');
const usersRouter = require('./users.routes.js');
const jobsRouter = require('./jobs.routes.js');
const postsRouter = require('./posts.routes.js');

const apiRoute = express();

apiRoute.use('/user', usersRouter);
apiRoute.use('/job', jobsRouter);
apiRoute.use('/post', postsRouter);

module.exports = apiRoute;
