const express = require('express');
const usersController = require('../controllers/user.controller.js');
const JwToken = require('../middleware/JwToken.js');
const FirebaseToken = require('../middleware/FirebaseToken.js');

const router = express.Router();

router.post(
  '/signin-with-google',
  FirebaseToken.authenFireToken,
  usersController.signInWithGoogle,
);
router.get('/profile', FirebaseToken.authenFireToken, usersController.profile);
router.post('/signin-with-email', usersController.signInWithEmail);
router.post('/signup-with-email', usersController.signUpWithEmail);
router.post('/refresh-token', usersController.refreshToken);

module.exports = router;
