const JobService = require('../services/job.service.js');

const summary = async (req, res) => {
  console.log('====================================');
  console.log('| [GET] /job/summary');
  console.log('| ----------------------------------');

  const summaryResult = await JobService.summary();

  console.log('|', summaryResult.res.msg);

  console.log('====================================');

  return res.status(summaryResult.status).json(summaryResult.res);
};

module.exports = {
  summary,
};
