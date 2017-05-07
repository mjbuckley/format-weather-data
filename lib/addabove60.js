const fixDecimal = require('./fixdecimal.js');
const fixSpecialValues = require('./fixspecialvalues.js');
const formatNoaaData = require('./formatnoaadata.js');
const separateFlags2C = require('./separateflags2c.js');

// Adds number of days where the temp gets above 60 to station data in stationsObj.
// Note that this is basically the same as the other functions adding above/below32Info
// info and I should really extract into one function.
function addAbove60(data, stationsObj) {

  let above60Info = formatNoaaData(data);
  above60Info = separateFlags2C(above60Info);
  above60Info = fixSpecialValues(above60Info);
  above60Info = fixDecimal(above60Info);

  // Add above60Info data to stationsObj.
  for (let i of above60Info) {
    const station = i[0];
    const above60 = i[1];
    if (stationsObj[station]) {
      stationsObj[station]["andTmxGe60"] = above60;
    }
  };

  return stationsObj;
}

module.exports = addAbove60;
