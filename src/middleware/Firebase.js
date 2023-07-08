const auth = require('firebase-admin/auth');

const verifyIdToken = async idToken => {
  return await auth
    .getAuth()
    .verifyIdToken(idToken)
    .then(decodedToken => decodedToken.uid)
    .catch(() => false);
};

const getUser = async uid => {
  try {
    return await auth.getAuth().getUser(uid);
  } catch (error) {
    return null;
  }
};

module.exports = {
  verifyIdToken,
  getUser,
};
