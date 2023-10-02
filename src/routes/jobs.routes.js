const express = require('express');
const jobsController = require('../controllers/job.controller.js');
const FirebaseToken = require('../middleware/FirebaseToken.js');

const router = express.Router();

router.get('/summary', FirebaseToken.authenFireToken, jobsController.summary);

module.exports = router;
