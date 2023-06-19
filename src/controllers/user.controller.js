const UserService = require('../services/user.service.js');

const signIn = async (req, res) => {
  const { email, password } = req.body;

  console.log('====================================');
  console.log('| [POST] /user/signin');
  console.log('| Email: ', email);
  console.log('| Password: ', password);
  console.log('| ----------------------------------');

  if (!email || !password) {
    console.log('| Received data is not correct!');
    console.log('====================================');
  }

  if (!email) return res.status(400).json({ msg: 'email field is required' });
  if (!password)
    return res.status(400).json({ msg: 'password field is required' });

  const resultSignIn = await UserService.signIn(email, password);

  console.log('|', resultSignIn.msg);
  if (resultSignIn.status !== 400) {
    res.status(200).json({
      ...resultSignIn,
    });
  } else {
    res.status(resultSignIn.status).json({ msg: resultSignIn.msg });
  }
  console.log('====================================');
};

const signUp = async (req, res) => {
  const { email, password, userName, lastName } = req?.body;

  console.log('====================================');
  console.log('| [POST] /user/signup');
  console.log('| Email: ', email);
  console.log('| Password: ', password);
  console.log('| UserName: ', userName);
  console.log('| LastName: ', lastName);
  console.log('| ----------------------------------');

  if (!email || !password || !userName) {
    console.log('| Received data is not correct!!!');
    console.log('====================================');
  }

  if (!email) return res.status(400).json({ msg: 'email field is required' });
  if (!password)
    return res.status(400).json({ msg: 'password field is required' });
  if (!userName)
    return res.status(400).json({ msg: 'userName field is required' });

  const resultSignUp = await UserService.signUp(
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
    res.status(resultSignUp.status).json({ msg: resultSignUp.msg });
  }
  console.log('====================================');
};

const profile = async (req, res) => {
  const id = req?.query?.id;
  console.log('====================================');
  console.log('| [GET] /user/profile');
  console.log('| Id: ', id);
  console.log('| ----------------------------------');

  if (!id) {
    console.log('| Received data is not correct!!!');
    console.log('====================================');
  }

  if (!id) return res.status(400).json({ msg: 'id query param is required' });
  const profileResult = await UserService.profile(id);

  console.log('|', profileResult.msg);

  if (profileResult.status !== 400) {
    res.status(200).json({
      ...profileResult,
    });
  } else {
    res.status(profileResult.status).json({ msg: profileResult.msg });
  }
  console.log('====================================');
};

const refreshToken = async (req, res) => {
  const { refreshToken, id } = req?.body;
  console.log('====================================');
  console.log('| [POST] /user/refreshtoken');
  console.log('| Id: ', id);
  console.log('| RefreshToken: ', refreshToken);
  console.log('| ----------------------------------');

  if (!refreshToken || !id) {
    console.log('| Received data is not correct!!!');
    console.log('====================================');
  }

  if (!refreshToken)
    return res.status(400).json({ msg: 'refreshToken field is required' });
  if (!id) return res.status(400).json({ msg: 'id field is required' });

  const refreshTokenResult = await UserService.refreshToken(refreshToken, id);

  if (
    refreshTokenResult?.status === 400 ||
    refreshTokenResult?.status === 403
  ) {
    console.log('| ', refreshTokenResult.msg);

    res.status(refreshTokenResult.status).json({ msg: refreshTokenResult.msg });
  } else {
    console.log('| Refresh Token Successfully!');

    res.status(200).json({
      ...refreshTokenResult,
    });
  }
  console.log('====================================');
};

module.exports = { signIn, signUp, profile, refreshToken };
