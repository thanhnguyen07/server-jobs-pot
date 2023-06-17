const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const generateToken = data => {
  const token = jwt.sign(data, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: '1h',
  });
  return token;
};
const generateRefreshToken = data => {
  const refreshToken = jwt.sign(data, process.env.ACCESS_REFRESH_TOKEN_SECRET, {
    expiresIn: '10 days',
  });
  return refreshToken;
};

const authenToken = (req, res, next) => {
  const authorizationHeader = req.headers['authorization'];
  // 'Beaer [token]'
  if (authorizationHeader) {
    const token = authorizationHeader.split(' ')[1];
    if (!token) res.status(403).send({msg: 'Forbidden'});

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, data) => {
      if (err) return res.status(401).send({msg: 'Unauthorized'});
      next();
    });
  } else {
    res.status(403).send({msg: 'Forbidden'});
  }
};

module.exports = {generateToken, generateRefreshToken, authenToken};
