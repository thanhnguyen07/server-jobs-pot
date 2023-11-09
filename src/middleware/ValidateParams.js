const Log = require('../utils/log.js');

const validateParams = schema => (req, res, next) => {
  const lengthQuery = Object.keys(req.query).length;

  const {error, value} = schema.validate(
    lengthQuery > 0 ? req.query : req.body,
  );

  if (error) {
    Log.request({
      req,
      msg: `[Validate params] ${error.details[0].message}`,
      code: 400,
    });

    return res.status(400).json({msg: error.details[0].message});
  }

  req.validatedParams = value;
  next();
};

export default validateParams;
