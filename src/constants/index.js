const dotenv = require('dotenv');

dotenv.config();

const URI_MONGODB = `mongodb+srv://${encodeURIComponent(
  process.env.MONGODB_ACCOUNT_NAME,
)}:${encodeURIComponent(process.env.MONGODB_ACCOUNT_PASSWORD)}@${
  process.env.MONGODB_CLUSTER
}/${process.env.MONGODB_DB_NAME}?retryWrites=true&w=majority`;

const PORT = process.env.PORT || 3000;

const TOKEN_EXPIRES_TIME = process.env.TOKEN_EXPIRES_TIME || '3h';

const REFRESH_TOKEN_EXPIRES_TIME =
  process.env.REFRESH_TOKEN_EXPIRES_TIME || '10 days';

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;

const ACCESS_REFRESH_TOKEN_SECRET = process.env.ACCESS_REFRESH_TOKEN_SECRET;

module.exports = {
  URI_MONGODB,
  PORT,
  TOKEN_EXPIRES_TIME,
  REFRESH_TOKEN_EXPIRES_TIME,
  ACCESS_TOKEN_SECRET,
  ACCESS_REFRESH_TOKEN_SECRET,
};
