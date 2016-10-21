const fixDecimal13C = require('./fixdecimal13c.js');
const fixSpecialValues13C = require('./fixspecialvalues13c.js');
const formatNoaaData = require('./formatnoaadata.js');
const separateFlags13C = require('./separateflags13c.js');
const addMaxMin = require('./addmaxmin.js');

function addMlyTMax(data, obj) {
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
