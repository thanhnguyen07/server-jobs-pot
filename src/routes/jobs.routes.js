const express = require('express');
const jobsController = require('../controllers/job.controller.js');
const JWToken = require('../middleware/JWToken.js');

const router = express.Router();

router.use(JWToken.verifyToken);
router.get('/summary', jobsController.summary);

module.exports = router;
