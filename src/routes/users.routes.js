const express = require('express');
const usersController = require('../controllers/user.controller.js');
const FirebaseToken = require('../middleware/FirebaseToken.js');

const router = express.Router();

router.get(
  '/signin-with-google',
  FirebaseToken.authenFireToken,
  usersController.signInWithGoogle,
);
router.post(
  '/signup-with-email',
  FirebaseToken.authenFireToken,
  usersController.signUpWithEmail,
);
router.get('/profile', FirebaseToken.authenFireToken, usersController.profile);

router.post(
  '/update-avatar',
  FirebaseToken.authenFireToken,
  usersController.updateAvatar,
);

router.post(
  '/update-informations',
  FirebaseToken.authenFireToken,
  usersController.updateInformations,
);

module.exports = router;
