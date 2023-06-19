const jwt = require('jsonwebtoken');
const UserModel = require('../models/user.model.js');
const Jwtoken = require('../middleware/JwToken.js');

const findUserByEmail = async email => {
  const result = await UserModel.findOne({
    email: email?.toLowerCase(),
  });

  return result;
};
const findUserById = async id => {
  const result = await UserModel.findById(id);

  return result;
};

const findUser = async (email, password) => {
  const result = await UserModel.findOne({
    email: email?.toLowerCase(),
    password: password,
  });

  return result;
};

const signIn = async (email, password) => {
  const findUserResult = await findUser(email, password);

  if (findUserResult) {
    const token = Jwtoken.generateToken({ email, password });
    const refreshToken = Jwtoken.generateRefreshToken({ email, password });

    const resUserData = findUserResult.toObject();

    resUserData.id = resUserData._id;
    delete resUserData._id;
    delete resUserData.password;
    delete resUserData.createdAt;
    delete resUserData.updatedAt;

    const resUser = {
      results: resUserData,
      token: token,
      refreshToken: refreshToken,
      msg: 'Login Successfully!',
    };

    return resUser;
  } else {
    return {
      status: 400,
      msg: 'Incorrect account information!',
    };
  }
};

const signUp = async (email, password, userName) => {
  const findEmailResult = await findUserByEmail(email);

  if (findEmailResult) {
    return {
      status: 400,
      msg: 'Email registered!',
    };
  } else {
    const newUser = new UserModel({
      email,
      password,
      userName,
    });
    const createUser = await newUser.save();
    if (createUser) {
      const token = Jwtoken.generateToken({ email, password });
      const refreshToken = Jwtoken.generateRefreshToken({ email, password });

      const resUserData = createUser.toObject();

      resUserData.id = resUserData._id;
      delete resUserData._id;
      delete resUserData.password;
      delete resUserData.createdAt;
      delete resUserData.updatedAt;

      const resUser = {
        results: resUserData,
        token: token,
        refreshToken: refreshToken,
        msg: 'Sign Up Successfully!',
      };
      return resUser;
    } else {
      return {
        status: 400,
        msg: 'Error creating user!',
      };
    }
  }
};

const profile = async id => {
  try {
    const findUserResult = await findUserById(id);

    if (findUserResult) {
      const { email, password } = findUserResult;

      const token = Jwtoken.generateToken({ email, password });
      const refreshToken = Jwtoken.generateRefreshToken({ email, password });

      const resUserData = findUserResult.toObject();

      resUserData.id = resUserData._id;
      delete resUserData._id;
      delete resUserData.password;
      delete resUserData.createdAt;
      delete resUserData.updatedAt;

      const resUser = {
        results: resUserData,
        token: token,
        refreshToken: refreshToken,
        msg: 'Get profile Successfully!',
      };

      return resUser;
    } else {
      return {
        status: 400,
        msg: 'User does not exist!',
      };
    }
  } catch (error) {
    return {
      status: 400,
      msg: 'User does not exist!',
    };
  }
};

const refreshToken = async (refreshToken, id) => {
  return jwt.verify(
    refreshToken,
    process.env.ACCESS_REFRESH_TOKEN_SECRET,
    async (err, data) => {
      if (err) {
        return {
          status: 403,
          msg: 'Forbidden!',
        };
      } else {
        try {
          const findUser = await findUserById(id);

          if (findUser) {
            const { email, password } = findUser;

            const token = Jwtoken.generateToken({ email, password });
            const refreshToken = Jwtoken.generateRefreshToken({
              email,
              password,
            });

            const resToken = {
              token: token,
              refreshToken: refreshToken,
              msg: 'Refresh Token Successfully!',
            };

            return resToken;
          } else {
            return {
              status: 400,
              msg: 'User does not exist!',
            };
          }
        } catch (error) {
          return {
            status: 400,
            msg: 'User does not exist!',
          };
        }
      }
    },
  );
};

module.exports = {
  findUserByEmail,
  findUser,
  signIn,
  signUp,
  profile,
  refreshToken,
};
