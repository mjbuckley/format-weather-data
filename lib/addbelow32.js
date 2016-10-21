const fixDecimal = require('./fixdecimal.js');
const fixSpecialValues = require('./fixspecialvalues.js');
const formatNoaaData = require('./formatnoaadata.js');
const separateFlags2C = require('./separateflags2c.js');

function addBelow32(data, obj) {
  let below32Info = formatNoaaData(data);
  below32Info = separateFlags2C(below32Info);
  below32Info = fixSpecialValues(below32Info);
  below32Info = fixDecimal(below32Info);

  // Add below32Info data to stationsObj.
  for (let i of below32Info) {
    const station = i[0];
    const below32 = i[1];
    if (obj[station]) {
      obj[station]["temp"]["daysBelow32"] = below32;
    }
  };

  return obj;
}

module.exports = addBelow32;
