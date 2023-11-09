const express = require('express');
const usersController = require('../controllers/user.controller.js');
const FirebaseToken = require('../middleware/FirebaseToken.js');
const validateParams = require('../middleware/ValidateParams.js').default;
const {
  signUpWithEmailValidateSchema,
  signInWithSocialValidateSchema,
  sendVerificationCodeValidateSchema,
  verifyCodeSchema,
} = require('../validate/schema.js');
const JWToken = require('../middleware/JWToken.js');

const router = express.Router();

router.post(
  '/signin-with-firebase',
  validateParams(signInWithSocialValidateSchema),
  usersController.signInWithFirebase,
);

router.post(
  '/signup-with-email',
  validateParams(signUpWithEmailValidateSchema),
  usersController.signUpWithEmail,
);

router.post(
  '/send-verification-code',
  validateParams(sendVerificationCodeValidateSchema),
  usersController.sendVerificationCode,
);
router.post(
  '/verify-code',
  validateParams(verifyCodeSchema),
  usersController.verifyCode,
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
