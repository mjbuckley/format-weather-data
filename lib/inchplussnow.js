const fixDecimal = require('./fixdecimal.js');
const fixSpecialValues = require('./fixspecialvalues.js');
const formatNoaaData = require('./formatnoaadata.js');
const separateFlags2C = require('./separateflags2c.js');




// addInnchPlusSnow(rawSnowData, stationsObj);

function inchPlusSnow(data, obj) {
  let snowInfo = formatNoaaData(data);
  snowInfo = separateFlags2C(snowInfo);
  snowInfo = fixSpecialValues(snowInfo);
  snowInfo = fixDecimal(snowInfo);

  // Add snowInfo data to stationsObj.
  for (let i of snowInfo) {
    const station = i[0];
    const snowfall = i[1];
    if (obj[station]) {
      obj[station]["snow"]["annInchPlus"] = snowfall;
    }
  };

  return obj;
};

module.exports = inchPlusSnow;
