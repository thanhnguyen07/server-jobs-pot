const UserModel = require('../models/user.model.js');
const FirebaseToken = require('../middleware/FirebaseToken.js');

const findUserByEmail = async email => {
  const result = await UserModel.findOne({
    email: email?.toLowerCase(),
  });

  return result;
};

const findUserByUiid = async uid => {
  const result = await UserModel.findOne({
    uid: uid,
  });

  return result;
};

const findUserById = async id => {
  try {
    const result = await UserModel.findById(id);
    return result;
  } catch (error) {
    return null;
  }
};

const findUser = async (email, password) => {
  const result = await UserModel.findOne({
    email: email?.toLowerCase(),
    password: password,
  });

  return result;
};

const profile = async req => {
  const userDataFirebase = await FirebaseToken.getUser(req);

  if (userDataFirebase) {
    const uid = userDataFirebase.uid;
    const userDataBase = await findUserByUiid(uid);

    if (userDataBase) {
      const resUserData = userDataBase.toObject();
      resUserData.id = resUserData._id;
      delete resUserData._id;
      delete resUserData.createdAt;
      delete resUserData.updatedAt;
      const res = {
        results: resUserData,
        msg: 'SignIn Successfully!',
      };
      return {status: 200, res};
    } else {
      return {
        status: 400,
        res: {msg: 'Account does not exist!'},
      };
    }
  } else {
    return {
      status: 400,
      res: {msg: 'Something wrong. Please re-signIn!'},
    };
  }
};

const signInWithGoogle = async req => {
  const userDataFirebase = await FirebaseToken.getUser(req);
  if (userDataFirebase) {
    const uid = userDataFirebase.uid;
    const findIdResult = await findUserByUiid(uid);
    const email = userDataFirebase.email;
    const userName = userDataFirebase.displayName;

    if (findIdResult) {
      const resUserData = findIdResult.toObject();

      resUserData.id = resUserData._id;
      delete resUserData._id;
      delete resUserData.createdAt;
      delete resUserData.updatedAt;

      const res = {
        results: resUserData,
        msg: 'Login Successfully!',
      };

      return {status: 200, res};
    } else {
      const type = 'google';

      const newUser = new UserModel({
        email,
        uid,
        userName,
        type,
      });

      const createUser = await newUser.save();

      if (createUser) {
        const resUserData = createUser.toObject();

        resUserData.id = resUserData._id;
        delete resUserData._id;
        delete resUserData.createdAt;
        delete resUserData.updatedAt;

        const res = {
          results: resUserData,
          msg: 'Login Successfully!',
        };

        return {status: 200, res};
      } else {
        return {
          status: 400,
          res: {msg: 'Something wrong!'},
        };
      }
    }
  } else {
    return {
      status: 400,
      res: {msg: 'Something wrong. Please re-login!'},
    };
  }
};

const signUpWithEmail = async req => {
  const {fullName} = req.body;
  const userDataFirebase = await FirebaseToken.getUser(req);

  if (userDataFirebase) {
    const email = userDataFirebase.email;
    const type = 'email';
    const userName = fullName;
    const uid = userDataFirebase.uid;

    const findUserByEmailResult = await findUserByEmail(email);
    if (findUserByEmailResult) {
      return {
        status: 400,
        res: {msg: 'Email registered!'},
      };
    } else {
      const newUser = new UserModel({
        email,
        uid,
        userName,
        type,
      });
      const createUser = await newUser.save();
      if (createUser) {
        const resUserData = createUser.toObject();
        resUserData.id = resUserData._id;
        delete resUserData._id;
        delete resUserData.createdAt;
        delete resUserData.updatedAt;
        const res = {
          results: resUserData,
          msg: 'SignUp Successfully!',
        };
        return {status: 200, res};
      } else {
        return {
          status: 400,
          res: {msg: 'Something wrong!'},
        };
      }
    }
  } else {
    return {
      status: 400,
      res: {msg: 'Something wrong. Please re-signup!'},
    };
  }
};

const updateAvatar = async req => {
  const {avatarLink} = req.body;

  const userDataFirebase = await FirebaseToken.getUser(req);
  if (userDataFirebase) {
    const uid = userDataFirebase.uid;

    await UserModel.updateOne(
      {
        uid,
      },
      {avatarLink},
    );

    const userDataBase = await findUserByUiid(uid);

    if (userDataBase) {
      const resUserData = userDataBase.toObject();
      resUserData.id = resUserData._id;
      delete resUserData._id;
      delete resUserData.createdAt;
      delete resUserData.updatedAt;
      const res = {
        results: resUserData,
        msg: 'Update avatar successfully!',
      };
      return {status: 200, res};
    } else {
      return {
        status: 400,
        res: {msg: 'Account does not exist!'},
      };
    }
  } else {
    return {
      status: 400,
      res: {msg: 'Something wrong. Please re-signIn!'},
    };
  }
};

const updateInformations = async req => {
  const {userName, dateOfBirth, gender, email, phoneNumber, location} =
    req.body;
  const userDataFirebase = await FirebaseToken.getUser(req);

  if (userDataFirebase) {
    const uid = userDataFirebase.uid;

    if (userName) {
      await UserModel.updateOne({uid}, {userName});
    }

    if (dateOfBirth) {
      await UserModel.updateOne({uid}, {dateOfBirth});
    }
    if (gender) {
      await UserModel.updateOne({uid}, {gender});
    }

    if (email) {
      await UserModel.updateOne({uid}, {email});
    }

    if (phoneNumber) {
      await UserModel.updateOne({uid}, {phoneNumber});
    }

    if (location) {
      await UserModel.updateOne({uid}, {location});
    }

    const userDataBase = await findUserByUiid(uid);

    if (userDataBase) {
      const resUserData = userDataBase.toObject();
      resUserData.id = resUserData._id;
      delete resUserData._id;
      delete resUserData.createdAt;
      delete resUserData.updatedAt;
      const res = {
        results: resUserData,
        msg: 'Update information successfully!',
      };
      return {status: 200, res};
    } else {
      return {
        status: 400,
        res: {msg: 'Account does not exist!'},
      };
    }
  } else {
    return {
      status: 400,
      res: {msg: 'Something wrong. Please re-signIn!'},
    };
  }
};

module.exports = {
  findUserByEmail,
  findUser,
  signUpWithEmail,
  profile,
  signInWithGoogle,
  updateAvatar,
  updateInformations,
};
