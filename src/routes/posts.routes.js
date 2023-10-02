const express = require('express');
const postsController = require('../controllers/post.controller.js');
const FirebaseToken = require('../middleware/FirebaseToken.js');

const router = express.Router();

router.get('/create', FirebaseToken.authenFireToken, postsController.create);

module.exports = router;
