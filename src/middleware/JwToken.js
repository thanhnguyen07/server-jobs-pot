const jwt = require('jsonwebtoken');
const {
  TOKEN_EXPIRES_TIME,
  REFRESH_TOKEN_EXPIRES_TIME,
  ACCESS_TOKEN_SECRET,
  ACCESS_REFRESH_TOKEN_SECRET,
} = require('../constants/index.js');

const generateToken = data => {
  const token = jwt.sign(data, ACCESS_TOKEN_SECRET, {
    expiresIn: TOKEN_EXPIRES_TIME,
  });
  return token;
};
const generateRefreshToken = data => {
  const refreshToken = jwt.sign(data, ACCESS_REFRESH_TOKEN_SECRET, {
    expiresIn: REFRESH_TOKEN_EXPIRES_TIME,
  });
  return refreshToken;
};

const getToken = req => {
  const authorizationHeader = req.headers['authorization'];
  // 'Beaer token'
  if (authorizationHeader) {
    const token = authorizationHeader.slice(7);
    return token;
  }
  return null;
};

const verifyToken = token => {
  return jwt.verify(token, ACCESS_TOKEN_SECRET, (err, data) => {
    return err ? false : true;
  });
};

const verifyRefreshToken = refreshToken => {
  return jwt.verify(refreshToken, ACCESS_REFRESH_TOKEN_SECRET, (err, data) => {
    return err ? false : true;
  });
};

const authenToken = (req, res, next) => {
  const token = getToken(req);

  if (token) {
    if (!token) res.status(403).send({msg: 'Forbidden'});

    const resVerifyToken = verifyToken(token);
    console.log(resVerifyToken);

    if (!resVerifyToken) {
      return res.status(401).send({msg: 'Unauthorized'});
    }
    next();
  } else {
    res.status(403).send({msg: 'Forbidden'});
  }
};

module.exports = {
  generateToken,
  generateRefreshToken,
  authenToken,
  getToken,
  verifyRefreshToken,
  verifyToken,
};
