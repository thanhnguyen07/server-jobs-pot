const express = require('express');
const usersController = require('../controllers/user.controller.js');
const JwToken = require('../middleware/JwToken.js');

const router = express.Router();

router.post('/signin-with-google', usersController.signInWithGoogle);
router.post('/signin-with-email', usersController.signInWithEmail);
router.post('/signup-with-email', usersController.signUpWithEmail);
router.get('/profile', JwToken.authenToken, usersController.profile);
router.post('/refresh-token', usersController.refreshToken);

module.exports = router;
