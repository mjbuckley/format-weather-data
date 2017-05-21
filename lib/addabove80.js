const fixDecimal = require('./fixdecimal.js');
const fixSpecialValues = require('./fixspecialvalues.js');
const formatNoaaData = require('./formatnoaadata.js');
const separateFlags2C = require('./separateflags2c.js');

// Adds number of days where the temp gets above 60 to station data in stationsObj.
// Note that this is basically the same as the other functions adding above/below32Info
// info and I should really extract into one function.
function addAbove80(data, stationsObj) {

  let above80Info = formatNoaaData(data);
  above80Info = separateFlags2C(above80Info);
  above80Info = fixSpecialValues(above80Info);
  above80Info = fixDecimal(above80Info);

  // Add above60Info data to stationsObj.
  for (let i of above80Info) {
    const station = i[0];
    const above80 = Number(i[1]);
    if (stationsObj[station]) {
      stationsObj[station]["andTmxGe80"] = above80;
    }
  };

  return stationsObj;
}

module.exports = addAbove80;
