const fixDecimal13C = require('./fixdecimal13c.js');
const fixSpecialValues13C = require('./fixspecialvalues13c.js');
const formatNoaaData = require('./formatnoaadata.js');
const separateFlags13C = require('./separateflags13c.js');
const addMaxMin = require('./addmaxmin.js');


// Break NOAA monthly average max temp into a usable form and add to stationsObj.
// Added in the form of an array with 12 elements. Elements 0-11 are the tmax values
// for jan-dec, and element 12 is the highest value of the 12 months.
function addMlyTMax(data, obj) {

  // Break NOAA avg tmax data up into usable form.
  let mlyTMaxInfo = formatNoaaData(data);
  mlyTMaxInfo = separateFlags13C(mlyTMaxInfo);
  mlyTMaxInfo = fixSpecialValues13C(mlyTMaxInfo);
  mlyTMaxInfo = fixDecimal13C(mlyTMaxInfo);
  mlyTMaxInfo = addMaxMin(mlyTMaxInfo, "max");

  // Add monthly tmax averages to stationsObj.
  for (let i of mlyTMaxInfo) {
    const station = i[0];
    const tempArray = i[1];
    if (obj[station]) {
      obj[station]["temp"]["mlyTMaxAvg"] = tempArray;
    }
  };

  return obj;
}

module.exports = addMlyTMax;
