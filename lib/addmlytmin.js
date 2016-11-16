const fixDecimal13C = require('./fixdecimal13c.js');
const fixSpecialValues13C = require('./fixspecialvalues13c.js');
const formatNoaaData = require('./formatnoaadata.js');
const separateFlags13C = require('./separateflags13c.js');
const addMaxMin = require('./addmaxmin.js');


// Break NOAA monthly average min temp into a usable form and add to stationsObj.
// Added in the form of an array with 12 elements. Elements 0-11 are the tmin values
// for jan-dec, and element 12 is the lowest value of the 12 months.
function addMlyTMin(data, obj) {

  // Break NOAA avg tmin data up into usable form.
  let mlyTMinInfo = formatNoaaData(data);
  mlyTMinInfo = separateFlags13C(mlyTMinInfo);
  mlyTMinInfo = fixSpecialValues13C(mlyTMinInfo);
  mlyTMinInfo = fixDecimal13C(mlyTMinInfo);
  mlyTMinInfo = addMaxMin(mlyTMinInfo, "min");

  // Add monthly tminaverages to stationsObj.
  for (let i of mlyTMinInfo) {
    const station = i[0];
    const tempArray = i[1];
    if (obj[station]) {
      obj[station]["mlyTMinAvg"] = tempArray;
    }
  };

  return obj;
}

module.exports = addMlyTMin;
