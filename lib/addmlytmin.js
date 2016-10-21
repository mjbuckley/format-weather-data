const fixDecimal13C = require('./fixdecimal13c.js');
const fixSpecialValues13C = require('./fixspecialvalues13c.js');
const formatNoaaData = require('./formatnoaadata.js');
const separateFlags13C = require('./separateflags13c.js');
const addMaxMin = require('./addmaxmin.js');

function addMlyTMin(data, obj) {
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
      obj[station]["temp"]["mlyTMinInfo"] = tempArray;
    }
  };

  return obj;
}

module.exports = addMlyTMin;
