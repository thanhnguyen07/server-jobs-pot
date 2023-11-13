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
router.put(
  '/verify-code',
  validateParams(verifyCodeSchema),
  usersController.verifyCode,
);

router.use(JWToken.verifyToken);
router.get(
  '/profile',
  validateParams(profileValidateSchema),
  usersController.profile,
);
router.put(
  '/update-avatar',
  validateParams(updateAvatarSchema),
  usersController.updateAvatar,
);
router.post('/update-informations', usersController.updateInformations);

module.exports = router;
