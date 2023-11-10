const PostModel = require('../models/post.model.js');

const create = async () => {
  const result = await JobModel.find({});

  const res = {
    results: result[0],
    msg: 'Get number of jobs successfully!',
  };
  return {status: 200, res};
};

module.exports = {
  create,
};
