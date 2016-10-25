const buildCbsaMap = require('./buildcbsamap.js');
const buildZctaToCbsaMap = require('./buildzctatocbsamap.js');


// Add the names of the metro and micropolitan areas that a station belongs
// to (if any). Note that its possible for a station to belong to multiple areas,
// and all areas are added to the area array if it does.
function addMetroMicro(stationsObj) {

  // Build map of ZCTA zips to CBSA numbers.
  let zctaToCbsaMap = buildZctaToCbsaMap();

  // Build map of CBSA numbers to metro/micro names
  let cbsaMap = buildCbsaMap();

  for (let station in stationsObj) {
    let zip = stationsObj[station]["location"]["zip"];
    if (zctaToCbsaMap[zip]) {
      let cbsaArr = zctaToCbsaMap[zip]; // this is an array
      for (let i = 0; i < cbsaArr.length; i++) {
        let cbsaNum = cbsaArr[i];
          stationsObj[station]["location"]["area"].push(cbsaNum);
      }
    }
  }
  return stationsObj;
}

module.exports = addMetroMicro;
