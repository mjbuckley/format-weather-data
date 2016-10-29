const buildCbsaMap = require('./buildcbsamap.js');
const buildZipToCbsaMap = require('./buildziptocbsamap.js');


// Add the names of the metro and micropolitan areas that a station belongs
// to (if any). Note that its possible for a station to belong to multiple areas,
// and all areas are added to the area array if it does.
function addMetroMicro(stationsObj) {

  // build zip to cbsa ids map: { zip: [cbsa1, cbsa2], etc. }
  let zipToCbsaMap = buildZipToCbsaMap();

  // Loop through stations and at cbsa ids (if any) to the station's area array.
  for (let station in stationsObj) {
    let zip = stationsObj[station]["location"]["zip"];
    if (zipToCbsaMap[zip]) {
      let cbsaArr = zipToCbsaMap[zip]; // this returns an array. Ex: [cbsa1, cbsa2]
      for (let i = 0; i < cbsaArr.length; i++) {
        let cbsaNum = cbsaArr[i];
        stationsObj[station]["location"]["area"].push(cbsaNum);
      }
    }
  }


  // Build map of cbsa ids to the actual metro/micro names
  let cbsaMap = buildCbsaMap(); // { cbsaCode: { area: "Columbus", state: "Ohio", type: "metrop..." }, etc. }

  // Array to place cbsa ids that aren't in the cbsa id to place name map (if any)
  let missing = [];

  // Loop through stations and change cbsa ids to actual names
  for (let station in stationsObj) {
    if (stationsObj[station]["location"]["area"].length > 0) { // Check if station has any cbsa codes
      let areaArr = stationsObj[station]["location"]["area"]; // grab array of current codes. Ex: [23432, 23433]
      let replacement = []; // Array to hold cbsa names. Will replace current array with id numbers
      for (let i = 0; i < areaArr.length; i++) { // loop through current codes array and change codes to names
        let cbsaValue = parseInt(areaArr[i], 10); // cbsa code for current iteration.
        if (cbsaMap[cbsaValue]) { // check if cbsa code is in cbsa to city name map
          let cbsaName = cbsaMap[cbsaValue]["area"]; // find name for code
          replacement.push(cbsaName); // Add name to replacement array
        } else {
          missing.push(cbsaValue);
        }
      }
      // Replace current area array with replacement array containing metro/micro names
      stationsObj[station]["location"]["area"] = replacement;
    }
  }
  // let missingObj = {};
  // for (let code of missing) {
  //   if (missingObj[code]) {
  //     let occurances = missingObj[code];
  //     occurances++;
  //     missingObj[code] = occurances;
  //
  //   } else {
  //     missingObj[code] = 1;
  //   }
  // }
  // console.log(missingObj);

  if (missing.length > 0) {
    for (let i = 0; i < missing.length; i++) {
      let value = missing[i];
      console.log("cbsa id " + value + " did not map to a name. Need to manually fix.");
    }
  } else {
    console.log("All cbsa ids mapped to metro/micro locations.");
  }

  //     areaArr = areaArr.map(function(id) {
  //       if (cbsaMap[id]) {
  //         let name = cbsaMap[id]["area"];
  //           return name;
  //       } else {
  //         console.log(id + " is missing");
  //       }
  //     });
  //     stationsObj[station]["location"]["area"] = areaArr;
  //   } else {
  //     continue;
  //   }
  // }

  return stationsObj;
}

module.exports = addMetroMicro;
