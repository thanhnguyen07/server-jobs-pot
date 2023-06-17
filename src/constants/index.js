const dotenv = require('dotenv');

dotenv.config();

const URI_MONGODB = `mongodb+srv://${encodeURIComponent(
  process.env.MONGODB_ACCOUNT_NAME,
)}:${encodeURIComponent(process.env.MONGODB_ACCOUNT_PASSWORD)}@${
  process.env.MONGODB_CLUSTER
}/${process.env.MONGODB_DB_NAME}?retryWrites=true&w=majority`;

const PORT = process.env.PORT || 3000;

module.exports = {URI_MONGODB, PORT};
