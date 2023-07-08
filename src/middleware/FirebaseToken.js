const auth = require('firebase-admin/auth');

const getTokenFromReq = req => {
  const authorizationHeader = req.headers['authorization'];
  // 'Bearer token'
  if (authorizationHeader) {
    const idToken = authorizationHeader.slice(7);
    return idToken;
  }
  return null;
};

const verifyIdToken = async idToken => {
  return await auth
    .getAuth()
    .verifyIdToken(idToken)
    .then(decodedToken => decodedToken.uid)
    .catch(() => false);
};

const getUser = async req => {
  const idToken = getTokenFromReq(req);

  const uid = await verifyIdToken(idToken);

  try {
    return await auth.getAuth().getUser(uid);
  } catch (error) {
    return null;
  }
};

const authenFireToken = (req, res, next) => {
  const idToken = getTokenFromReq(req);
  if (idToken) {
    const resVerifyIdToken = verifyIdToken(idToken);

    if (!resVerifyIdToken) {
      return res.status(401).send({msg: 'Unauthorized'});
    }
    next();
  } else {
    res.status(403).send({msg: 'Forbidden'});
  }
};

module.exports = {
  verifyIdToken,
  getUser,
  authenFireToken,
  getTokenFromReq,
};
