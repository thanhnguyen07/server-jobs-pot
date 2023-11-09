const UserService = require('../services/user.service.js');
const Log = require('../utils/log.js');

const profile = async (req, res) => {
  console.log('====================================');
  console.log('| [GET] /user/profile');
  console.log('| ----------------------------------');

  const profileResult = await UserService.profile(req);

  console.log('|', profileResult.res.msg);

  console.log('====================================');
  return res.status(profileResult.status).json(profileResult.res);
};

const updateInformations = async (req, res) => {
  const {userName, dateOfBirth, gender, email, phoneNumber, location} =
    req.body;
  console.log('====================================');
  console.log('| [POST] /user/update-informations');
  console.log('| userName: ', userName);
  console.log('| dateOfBirth: ', dateOfBirth);
  console.log('| gender: ', gender);
  console.log('| email: ', email);
  console.log('| phoneNumber: ', phoneNumber);
  console.log('| location: ', location);
  console.log('| ----------------------------------');

  if (
    !userName &&
    !dateOfBirth &&
    !gender &&
    !email &&
    !phoneNumber &&
    !location
  ) {
    console.log('| Incorrect update information!!!');
    console.log('====================================');
    return res.status(400).json({msg: 'Incorrect update information!!!'});
  }

  if (gender != 'Male' && gender != 'Female') {
    console.log('| gender data field is malformed!!!');
    console.log('====================================');
    return res.status(400).json({msg: 'gender data field is malformed!!!'});
  }
  const updateInformationsResult = await UserService.updateInformations(req);

  console.log('|', updateInformationsResult.res.msg);

  console.log('====================================');
  return res
    .status(updateInformationsResult.status)
    .json(updateInformationsResult.res);
};

const signInWithFirebase = async (req, res) => {
  const {token_firebase} = req.body;

  const signInWithGoogleResult = await UserService.signInWithFirebase(
    token_firebase,
  );

  Log.request({
    req: req,
    msg: signInWithGoogleResult?.res?.msg,
    code: signInWithGoogleResult.status,
  });

  return res
    .status(signInWithGoogleResult.status)
    .json(signInWithGoogleResult.res);
};

const signUpWithEmail = async (req, res) => {
  const {user_name, token_firebase} = req.body;

  const signUpWithEmailResult = await UserService.signUpWithEmail(
    user_name,
    token_firebase,
  );

  Log.request({
    req: req,
    msg: signUpWithEmailResult?.res?.msg,
    code: signUpWithEmailResult.status,
  });

  return res
    .status(signUpWithEmailResult.status)
    .json(signUpWithEmailResult.res);
};

const sendVerificationCode = async (req, res) => {
  const {email} = req.body;

  const sendResult = await UserService.sendVerificationCode(email);

  Log.request({
    req: req,
    msg: sendResult?.msg,
    code: sendResult.status,
  });

  return res.status(sendResult.status).json(sendResult.res);
};

const verifyCode = async (req, res) => {
  const {code} = req.body;

  const verifyCodeResult = await UserService.verifyCodeService(code);

  Log.request({
    req: req,
    msg: verifyCodeResult?.res?.msg,
    code: verifyCodeResult.status,
  });

  return res.status(verifyCodeResult.status).json(verifyCodeResult.res);
};

const updateAvatar = async (req, res) => {
  const {avatarLink} = req.body;
  console.log('====================================');
  console.log('| [POST] /user/update-image');
  console.log('| Avatar Link: ', avatarLink);
  console.log('| ----------------------------------');

  if (!avatarLink) {
    console.log('| Avatar Link not found');
    console.log('====================================');
    return res.status(400).send('Avatar Link is required!');
  }

  const uploadImageResult = await UserService.updateAvatar(req);

  if (uploadImageResult.status) {
    console.log('| ', uploadImageResult?.res?.msg);
    console.log('====================================');
    return res.status(uploadImageResult?.status).json(uploadImageResult?.res);
  }
};

module.exports = {
  signUpWithEmail,
  profile,
  updateAvatar,
  updateInformations,
  signInWithFirebase,
  sendVerificationCode,
  verifyCode,
};
