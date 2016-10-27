const buildCbsaMap = require('./buildcbsamap.js');
const buildZctaToCbsaMap = require('./buildzctatocbsamap.js');


// Add the names of the metro and micropolitan areas that a station belongs
// to (if any). Note that its possible for a station to belong to multiple areas,
// and all areas are added to the area array if it does.
function addMetroMicro(stationsObj) {

  // Build map of ZCTA zips to CBSA numbers.
  let zctaToCbsaMap = buildZctaToCbsaMap();

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


  // Build map of CBSA numbers to metro/micro names
  let cbsaMap = buildCbsaMap();

  // Change cbsa ids to actual names
  for (let station in stationsObj) {
    if (stationsObj[station]["location"]["area"].length > 0) {
      let areaArr = stationsObj[station]["location"]["area"]; // [23432, 23433]
      areaArr = areaArr.map(function(id) {
        if (cbsaMap[id]) {
          let name = cbsaMap[id]["area"];
          return name;
        } else {
          console.log(id + " is missing");
        }
      });
      stationsObj[station]["location"]["area"] = areaArr;
    } else {
      continue;
    }
  }

  return stationsObj;
}

module.exports = addMetroMicro;
