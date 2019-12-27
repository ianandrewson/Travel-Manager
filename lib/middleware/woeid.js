const { woeid } = require('../utils/weather.js');

module.exports = (req, res, next) => {
  woeid(req.body.lattitude, req.body.longitude)
    .then(woeid => {
      req.woeid = woeid;
      next();
    });
};
