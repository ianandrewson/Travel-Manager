const superagent = require('superagent');

const getWoeid = (lattitude, longitude) => {
  return superagent
    .get(`https://www.metaweather.com/api/location/search/?lattlong=${lattitude},${longitude}`)
    .then(res => {
      const location = res.body[0];
      return location.woeid;
    });
};

const getWeather = (woeid, date) => {
  return superagent
    .get(`https://www.metaweather.com/api/location/${woeid}/${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`)
    .then(res => res.body[0]);
};

module.exports = {
  getWoeid,
  getWeather
};
