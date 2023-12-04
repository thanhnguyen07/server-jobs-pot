const {MSG_TYPE} = require('../constants/index.js');

const generateRandomCode = () => {
  return Math.floor(100000 + Math.random() * 900000);
};

const hasPassed2Minutes = lastUpdatedTime => {
  const lastUpdatedDate = new Date(lastUpdatedTime);
  const now = new Date();
  const differenceInSeconds = (now - lastUpdatedDate) / 1000;

  return differenceInSeconds >= 120;
};

const getFileName = url => {
  const parts = url.split('/');
  const lastPart = parts[parts.length - 1];
  const queryParts = lastPart.split('?');
  return queryParts[0];
};

const getCurrentTimeUTC = () => {
  const currentDate = new Date();

  const hours = currentDate.getUTCHours();
  const minutes = currentDate.getUTCMinutes();
  const seconds = currentDate.getUTCSeconds();

  const formattedTime =
    (hours < 10 ? '0' : '') +
    hours +
    '_' +
    (minutes < 10 ? '0' : '') +
    minutes +
    '_' +
    (seconds < 10 ? '0' : '') +
    seconds;

  return formattedTime;
};

const getMsg = (type, msg) => {
  switch (type) {
    case MSG_TYPE.account_error:
      return 'Account does not exist!';
    case MSG_TYPE.error_re_login:
      return 'Something wrong. Please re-signup!';
    case MSG_TYPE.wrong:
      return 'Something went wrong!';
    case MSG_TYPE.successfully:
      return `${msg} successfully!`;
    case MSG_TYPE.failure:
      return `${msg} failure!`;
    case MSG_TYPE.failed:
      return `${msg} failed!`;
    default:
      break;
  }
};

module.exports = {
  generateRandomCode,
  hasPassed2Minutes,
  getFileName,
  getCurrentTimeUTC,
  getMsg,
};
