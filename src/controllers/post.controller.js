const PostService = require('../services/post.service.js');

const create = async (req, res) => {
  console.log('====================================');
  console.log('| [GET] /post/create');
  console.log('| ----------------------------------');

  const summaryResult = await PostService.create();

  console.log('|', summaryResult.res.msg);

  console.log('====================================');

  return res.status(summaryResult.status).json(summaryResult.res);
};

module.exports = {
  create,
};
