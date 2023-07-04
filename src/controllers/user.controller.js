const UserService = require('../services/user.service.js');
const auth = require('firebase-admin/auth');

const signIn = async (req, res) => {
  const {email, password} = req.body;

  console.log('====================================');
  console.log('| [POST] /user/signin');
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

  const resultSignIn = await UserService.signIn(email, password);

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

const signUp = async (req, res) => {
  const {email, password, userName} = req?.body;

  console.log('====================================');
  console.log('| [POST] /user/signup');
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

  const resultSignUp = await UserService.signUp(email, password, userName);

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
  console.log('| [POST] /user/refreshtoken');
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

const signupwithgoogle = async (req, res) => {
  const body = req.body;

  console.log('====================================');
  console.log('| [POST] /user/signupwithgoogle');
  console.log('| body: ', body);
  console.log('| ----------------------------------');

  auth
    .getAuth()
    .verifyIdToken(
      'eyJhbGciOiJSUzI1NiIsImtpZCI6ImY5N2U3ZWVlY2YwMWM4MDhiZjRhYjkzOTczNDBiZmIyOTgyZTg0NzUiLCJ0eXAiOiJKV1QifQ.eyJuYW1lIjoiVGjDoG5oIE5ndXnhu4VuIiwicGljdHVyZSI6Imh0dHBzOi8vbGgzLmdvb2dsZXVzZXJjb250ZW50LmNvbS9hL0FBY0hUdGNMaWdaSEpvd1plOXhjRFowekFjdWZUWXFIekljVFAzcGVwWUJTRkpobG1nPXM5Ni1jIiwiaXNzIjoiaHR0cHM6Ly9zZWN1cmV0b2tlbi5nb29nbGUuY29tL2pvYnMtcG90LTZmMmIzIiwiYXVkIjoiam9icy1wb3QtNmYyYjMiLCJhdXRoX3RpbWUiOjE2ODg0NTEyNTUsInVzZXJfaWQiOiJYdmVRNUxPU0Z1TThUaHpGRU5vVE11djdmNDgzIiwic3ViIjoiWHZlUTVMT1NGdU04VGh6RkVOb1RNdXY3ZjQ4MyIsImlhdCI6MTY4ODQ1MTI1NSwiZXhwIjoxNjg4NDU0ODU1LCJlbWFpbCI6InRoYW5oamFuZzJrQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7Imdvb2dsZS5jb20iOlsiMTE2MTY1ODQ0NTY1OTI3NzI2MDc1Il0sImVtYWlsIjpbInRoYW5oamFuZzJrQGdtYWlsLmNvbSJdfSwic2lnbl9pbl9wcm92aWRlciI6Imdvb2dsZS5jb20ifX0.BfWe-Y7BsDolHzRGlhiCilYw54-u1ggDWFG-0fT-7PdbGecRl5PmHxDS4SglJkR-CI8W91U6_5V379RiGR2BgLgHj_Ut_dIU6knLH3f251EYbcjLA_RuzH9CaTj8znxA7J2GWsVkyMICCbJ2MM-_899C6KJbL_Dw7HM9nO-jZ2yBetwOQGzKv0iWRDdfbiU1AVm_rZNYQQAfU3oYrISBYnWERnGL8nRMSrGRa9OpNlTGh_H7jlJmj9yZjcSovMrKkCP0LeBplZFdvJgj6I9X19cfwp2rfu6t7EGjCwpRPvVz_gLU0FY8sr-AE_aQtm0XXzhygXaKRKL0uGZmkFgdTw',
    )
    .then(() => {
      console.log('done');
    })
    .catch(e => console.log('e', e));

  res.status(200).json({msg: 'password field is required'});
};

module.exports = {signIn, signUp, profile, refreshToken, signupwithgoogle};
