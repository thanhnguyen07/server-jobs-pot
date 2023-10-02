const UserService = require('../services/user.service.js');

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

const signInWithGoogle = async (req, res) => {
  console.log('====================================');
  console.log('| [GET] /user/signin-with-google');
  console.log('| ----------------------------------');

  const signInWithGoogleResult = await UserService.signInWithGoogle(req);

  console.log('| ', signInWithGoogleResult.res.msg);
  console.log('====================================');

  return res
    .status(signInWithGoogleResult.status)
    .json(signInWithGoogleResult.res);
};

const signUpWithEmail = async (req, res) => {
  const {fullName} = req.body;

  console.log('====================================');
  console.log('| [POST] /user/signup-with-email');
  console.log('| fullName: ', fullName);
  console.log('| ----------------------------------');

  if (!fullName) {
    console.log('| Received data is not correct!!!');
    console.log('====================================');
    return res.status(400).json({msg: 'fullName field is required'});
  }

  const signInWithEmailResult = await UserService.signUpWithEmail(req);

  console.log('| ', signInWithEmailResult.res.msg);
  console.log('====================================');

  return res
    .status(signInWithEmailResult.status)
    .json(signInWithEmailResult.res);
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
  signInWithGoogle,
  updateAvatar,
  updateInformations,
};
