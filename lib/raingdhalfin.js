const fixDecimal = require('./fixdecimal.js');
const fixSpecialValues = require('./fixspecialvalues.js');
const formatNoaaData = require('./formatnoaadata.js');
const separateFlags2C = require('./separateflags2c.js');


// Break NOAA rain data up into usable form and add to stationsObj.
function rainGdHalfIn(data, obj) {

  // Break NOAA rain data up into a usable form.
  let rainGdHalfInInfo = formatNoaaData(data);
  rainGdHalfInInfo = separateFlags2C(rainGdHalfInInfo);
  rainGdHalfInInfo = fixSpecialValues(rainGdHalfInInfo);
  rainGdHalfInInfo = fixDecimal(rainGdHalfInInfo);

  // Add precip info to stationsObj.
  for (let i of rainGdHalfInInfo) {
    const station = i[0];
    const rainDays = i[1];
    if (obj[station]) {
      obj[station]["andPrGe5Ti"] = rainDays;
    }
  };

  return obj;
}

module.exports = rainGdHalfIn;
