const express = require('express');
const usersController = require('../controllers/user.controller.js');
const validateParams = require('../middleware/ValidateParams.js').default;
const {
  signUpWithEmailValidateSchema,
  signInWithSocialValidateSchema,
  sendVerificationCodeValidateSchema,
  verifyCodeSchema,
  profileValidateSchema,
  updateAvatarSchema,
  refreshTokenValidateSchema,
  customTokenValidateSchema,
  checkAccountValidateSchema,
} = require('../validate/schema.js');
const JWToken = require('../middleware/JWToken.js');

const router = express.Router();

router.post(
  '/check-account',
  validateParams(checkAccountValidateSchema),
  usersController.checkAccount,
);

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
router.put(
  '/verify-code',
  validateParams(verifyCodeSchema),
  usersController.verifyCode,
);

router.post(
  '/refresh-token',
  validateParams(refreshTokenValidateSchema),
  usersController.refreshToken,
);

router.post(
  '/custom-token',
  validateParams(customTokenValidateSchema),
  usersController.customToken,
);

router.use(JWToken.verifyToken);
router.get(
  '/profile',
  validateParams(profileValidateSchema),
  usersController.profile,
);

router.put(
  '/update-image',
  validateParams(updateAvatarSchema),
  usersController.updateImage,
);

router.post('/update-informations', usersController.updateInformations);

module.exports = router;
