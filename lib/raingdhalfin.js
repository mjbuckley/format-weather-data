const fixDecimal = require('./fixdecimal.js');
const fixSpecialValues = require('./fixspecialvalues.js');
const formatNoaaData = require('./formatnoaadata.js');
const separateFlags2C = require('./separateflags2c.js');

function rainGdHalfIn(data, obj) {
  let rainGdHalfInInfo = formatNoaaData(data);
  rainGdHalfInInfo = separateFlags2C(rainGdHalfInInfo);
  rainGdHalfInInfo = fixSpecialValues(rainGdHalfInInfo);
  rainGdHalfInInfo = fixDecimal(rainGdHalfInInfo);

  // Add precip info to stationsObj.
  for (let i of rainGdHalfInInfo) {
    const station = i[0];
    const rainDays = i[1];
    if (obj[station]) {
      obj[station]["precip"]["annprcpge050hi"] = rainDays;
    }
  };

  return obj;
}

module.exports = rainGdHalfIn;
