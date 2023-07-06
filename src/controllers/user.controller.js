const UserService = require('../services/user.service.js');

const signInWithEmail = async (req, res) => {
  const {email, password} = req.body;

  console.log('====================================');
  console.log('| [POST] /user/signin-with-email');
  console.log('| Email: ', email);
  console.log('| Password: ', password);
  console.log('| ----------------------------------');

  if (!email || !password) {
    console.log('| Received data is not correct!');
    console.log('====================================');
  }

  if (!email) return res.status(400).json({msg: 'email field is required'});
  if (!password)
    return res.status(400).json({msg: 'password field is required'});

  const resultSignIn = await UserService.signInWithEmail(email, password);

  console.log('|', resultSignIn.msg);
  if (resultSignIn.status !== 400) {
    res.status(200).json({
      ...resultSignIn,
    });
  } else {
    res.status(resultSignIn.status).json({msg: resultSignIn.msg});
  }
  console.log('====================================');
};

const signUpWithEmail = async (req, res) => {
  const {email, password, userName} = req?.body;

  console.log('====================================');
  console.log('| [POST] /user/signup-with-email');
  console.log('| Email: ', email);
  console.log('| Password: ', password);
  console.log('| UserName: ', userName);
  console.log('| ----------------------------------');

  if (!email || !password || !userName) {
    console.log('| Received data is not correct!!!');
    console.log('====================================');
  }

  if (!email) return res.status(400).json({msg: 'email field is required'});
  if (!password)
    return res.status(400).json({msg: 'password field is required'});
  if (!userName)
    return res.status(400).json({msg: 'userName field is required'});

  const resultSignUp = await UserService.signUpWithEmail(
    email,
    password,
    userName,
  );

  console.log('|', resultSignUp.msg);
  if (resultSignUp.status !== 400) {
    res.status(200).json({
      ...resultSignUp,
    });
  } else {
    res.status(resultSignUp.status).json({msg: resultSignUp.msg});
  }
  console.log('====================================');
};

const profile = async (req, res) => {
  console.log('====================================');
  console.log('| [GET] /user/profile');
  console.log('| ----------------------------------');

  const profileResult = await UserService.profile(req);

  console.log('|', profileResult.msg);

  if (profileResult.status !== 400) {
    res.status(200).json({
      ...profileResult,
    });
  } else {
    res.status(profileResult.status).json({msg: profileResult.msg});
  }
  console.log('====================================');
};

const refreshToken = async (req, res) => {
  const {refreshToken} = req?.body;
  console.log('====================================');
  console.log('| [POST] /user/refresh-token');
  console.log('| RefreshToken: ', refreshToken);
  console.log('| ----------------------------------');

  if (!refreshToken)
    return res.status(400).json({msg: 'refreshToken field is required'});

  const refreshTokenResult = await UserService.refreshToken(refreshToken, req);

  if (
    refreshTokenResult?.status === 400 ||
    refreshTokenResult?.status === 403
  ) {
    console.log('| ', refreshTokenResult.msg);

    res.status(refreshTokenResult.status).json({msg: refreshTokenResult.msg});
  } else {
    console.log('| Refresh Token Successfully!');

    res.status(200).json({
      ...refreshTokenResult,
    });
  }
  console.log('====================================');
};

const signInWithGoogle = async (req, res) => {
  const {idToken, uid} = req.body;

  console.log('====================================');
  console.log('| [POST] /user/signin-with-google');
  console.log('| idToken: ', idToken);
  console.log('| uid: ', uid);
  console.log('| ----------------------------------');

  if (!idToken || !uid) {
    console.log('| Received data is not correct!!!');
    console.log('====================================');
  }

  if (!idToken) return res.status(400).json({msg: 'idToken field is required'});
  if (!uid) return res.status(400).json({msg: 'uid field is required'});

  const signInWithGoogleResult = await UserService.signInWithGoogle(
    idToken,
    uid,
  );

  if (signInWithGoogleResult.status !== 400) {
    res.status(200).json({
      ...signInWithGoogleResult,
    });
  } else {
    res
      .status(signInWithGoogleResult.status)
      .json({msg: signInWithGoogleResult.msg});
  }
  console.log('| Sign In Successfully!!!');
  console.log('====================================');
};

module.exports = {
  signInWithEmail,
  signUpWithEmail,
  profile,
  refreshToken,
  signInWithGoogle,
};
