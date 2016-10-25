const fixDecimal = require('./fixdecimal.js');
const fixSpecialValues = require('./fixspecialvalues.js');
const formatNoaaData = require('./formatnoaadata.js');
const separateFlags2C = require('./separateflags2c.js');


// Break NOAA snow data up into a usable form and add to stationsObj.
function inchPlusSnowGnd(data, obj) {

  // Break NOAA snow data up into a usable form.
  let snowGndInfo = formatNoaaData(data);
  snowGndInfo = separateFlags2C(snowGndInfo);
  snowGndInfo = fixSpecialValues(snowGndInfo);
  snowGndInfo = fixDecimal(snowGndInfo);

  // Add snow ground cover info to stationsObj.
  for (let i of snowGndInfo) {
    const station = i[0];
    const snowdays = i[1];
    if (obj[station]) {
      obj[station]["snow"]["annGndInchPlus"] = snowdays;
    }
  };

  return obj;
}

module.exports = inchPlusSnowGnd;
