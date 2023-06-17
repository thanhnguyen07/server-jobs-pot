const express = require('express');
const usersController = require('../controllers/user.controller.js');
const JwToken = require('../middleware/JwToken.js');

const router = express.Router();

router.post('/signin', usersController.signIn);
router.post('/signup', usersController.signUp);
router.get('/profile', JwToken.authenToken, usersController.profile);
router.post('/refreshtoken', usersController.refreshToken);

module.exports = router;
