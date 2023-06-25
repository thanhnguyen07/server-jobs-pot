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
const findUserByToken = async token => {
  const result = await UserModel.findOne({token});

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
    const refreshToken = Jwtoken.generateRefreshToken({email, password});

    const resUserData = findUserResult.toObject();

    let token = resUserData.token;

    const verifyToken = Jwtoken.verifyToken(token);

    if (!verifyToken) {
      token = Jwtoken.generateToken({
        email: resUserData.email,
        password: resUserData.password,
      });
      await updateUserToken(resUserData._id, token)
    }

    resUserData.id = resUserData._id;
    delete resUserData.token;
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
    const token = Jwtoken.generateToken({email, password});
    const refreshToken = Jwtoken.generateRefreshToken({email, password});

    const newUser = new UserModel({
      email,
      password,
      userName,
      token,
    });
    const createUser = await newUser.save();
    if (createUser) {
      const resUserData = createUser.toObject();

      resUserData.id = resUserData._id;
      delete resUserData.token;
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

const profile = async req => {
  try {
    const token = Jwtoken.getToken(req);

    const findUserResult = await findUserByToken(token);

    if (findUserResult) {
      const {email, password} = findUserResult;

      const refreshToken = Jwtoken.generateRefreshToken({email, password});

      const resUserData = findUserResult.toObject();

      resUserData.id = resUserData._id;
      delete resUserData.token;
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
        msg: 'User does not exist or token is old. Please login again!',
      };
    }
  } catch (error) {
    return {
      status: 400,
      msg: 'User does not exist or token is old. Please login again!',
    };
  }
};

const refreshToken = async (refreshToken, req) => {
  const verifyRefreshToken = Jwtoken.verifyRefreshToken(refreshToken);

  if (verifyRefreshToken) {
    const token = Jwtoken.getToken(req);

    if (token) {
      const findUserResult = await findUserByToken(token);

      if (findUserResult) {
        const {email, password} = findUserResult;

        const token = Jwtoken.generateToken({email, password});
        const refreshToken = Jwtoken.generateRefreshToken({email, password});

        await updateUserToken(findUserResult._id, token);

        const resUserData = findUserResult.toObject();

        resUserData.id = resUserData._id;
        delete resUserData.token;
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
          msg: 'User does not exist or token is old. Please login again!',
        };
      }
    } else {
      return {
        status: 400,
        msg: 'Token header is required!',
      };
    }
  } else {
    return {
      status: 403,
      msg: 'Forbidden!',
    };
  }
};

const updateUserToken = async (idUser, token) => {
  const resUpdate = await UserModel.updateOne(
    {
      _id: idUser,
    },
    {token},
  );

  return resUpdate;
};

module.exports = {
  findUserByEmail,
  findUser,
  signIn,
  signUp,
  profile,
  refreshToken,
  updateUserToken,
};
