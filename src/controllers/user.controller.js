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

module.exports = {
  signUpWithEmail,
  profile,
  signInWithGoogle,
};
