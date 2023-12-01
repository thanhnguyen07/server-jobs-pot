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
  accountLinkSchema,
  checkAccountValidateSchema,
  accountUnLinkSchema,
  deleteAccountValidateSchema,
} = require('../validate/schema.js');
const JWToken = require('../middleware/JWToken.js');
const multer = require('multer');
const upload = multer({storage: multer.memoryStorage()});

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
  '/refresh-token',
  validateParams(refreshTokenValidateSchema),
  usersController.refreshToken,
);

// Require Token
router.use(JWToken.verifyToken);
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

router.get(
  '/profile',
  validateParams(profileValidateSchema),
  usersController.profile,
);
router.put(
  '/account-link',
  validateParams(accountLinkSchema),
  usersController.accountLink,
);
router.put(
  '/account-unlink',
  validateParams(accountUnLinkSchema),
  usersController.accountUnLink,
);

router.delete(
  '/delete-account',
  validateParams(deleteAccountValidateSchema),
  usersController.deleteAccount,
);

router.post('/update-informations', usersController.updateInformations);

router.use(upload.any());
router.put(
  '/update-image',
  validateParams(updateAvatarSchema),
  usersController.updateImage,
);

module.exports = router;
