const buildCbsaMap = require('./buildcbsamap.js');
const buildZipToCbsaMap = require('./buildziptocbsamap.js');


// Add the names of the metro and micropolitan areas that a station belongs
// to (if any). Note that its possible for a station to belong to multiple areas,
// and all areas are added to the area array if it does. Also, find if station's
// cbsa also has other stations with the cbsa.
function addMetroMicro(stationsObj) {

  // build zip to cbsa ids map: { zip: [cbsa1, cbsa2], etc. }
  let zipToCbsaMap = buildZipToCbsaMap();


  // Keep track of how many statins belong to each metro/micro (for link purposes in app).
  // Will result in something like { 34233: 3, 23343: 1, etc }.
  let cbsaCount = {};


  // Loop through stations and at cbsa ids (if any) to the station's area array.
  for (let station in stationsObj) {
    let zip = stationsObj[station]["zip"];
    if (zipToCbsaMap[zip]) {
      let cbsaArr = zipToCbsaMap[zip]; // this returns an array. Ex: [cbsa1, cbsa2]
      for (let i = 0; i < cbsaArr.length; i++) {
        let cbsaNum = cbsaArr[i];
        stationsObj[station]["area"].push(cbsaNum); // Add cbsa to station

        // Also add to running cbsa count
        if (cbsaCount[cbsaNum]) {
          let number = cbsaCount[cbsaNum];
          number ++;
          cbsaCount[cbsaNum] = number;
        } else {
          cbsaCount[cbsaNum] = 1;
        }
      }
    }
  }

  // Remove cbsa ids from cbsaCount that only have one station.
  for (let id in cbsaCount) {
    if (cbsaCount[id] === 1) {
      delete cbsaCount[id];
    }
  }


  // Use cbsa count to find if a stations cbsa ids are also shared with other stations.
  // If yes, add those stations to the sharedarea array (will be useful info for weather app).
  for (let station in stationsObj) {
    if (stationsObj[station]["area"].length > 0) {
      let areaArr = stationsObj[station]["area"];
      for (let id of areaArr) {
        if (cbsaCount[id]) {
          stationsObj[station]["sharedarea"].push(id);
        }
      }
    }
  }


  // Build map of cbsa ids to the actual metro/micro names
  let cbsaMap = buildCbsaMap(); // { cbsaCode: { area: "Columbus", state: "Ohio", type: "metrop..." }, etc. }

  // Array to place cbsa ids that aren't in the cbsa id to place name map (if any)
  let missing = [];


  // Loop through stations and change cbsa ids to actual names
  for (let station in stationsObj) {
    if (stationsObj[station]["area"].length > 0) { // Check if station has any cbsa codes
      let areaArr = stationsObj[station]["area"]; // grab array of current codes. Ex: [23432, 23433]
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
      stationsObj[station]["area"] = replacement;
    }
  }


  // Now do same thing for sharedarea. Don't need to check for missing as done above because
  // all cbsa codes in sharedarea array are also present in area array and will be caught there.
  for (let station in stationsObj) {
    if (stationsObj[station]["sharedarea"].length > 0) { // Check if station has any cbsa codes
      let sharedAreaArr = stationsObj[station]["sharedarea"]; // grab array of current codes. Ex: [23432, 23433]
      let replacement = []; // Array to hold cbsa names. Will replace current array with id numbers
      for (let i = 0; i < sharedAreaArr.length; i++) { // loop through current codes array and change codes to names
        let cbsaValue = parseInt(sharedAreaArr[i], 10); // cbsa code for current iteration.
        if (cbsaMap[cbsaValue]) { // check if cbsa code is in cbsa to city name map
          let cbsaName = cbsaMap[cbsaValue]["area"]; // find name for code
          replacement.push(cbsaName); // Add name to replacement array
        }
      }
      // Replace current area array with replacement array containing metro/micro names
      stationsObj[station]["sharedarea"] = replacement;
    }
  }


  // alert if any used cbsa ids didn't get mapped to a name (would need to be manually resolved)
  if (missing.length > 0) {
    for (let i = 0; i < missing.length; i++) {
      let value = missing[i];
      console.log("cbsa id " + value + " did not map to a name. Need to manually fix.");
    }
  } else {
    console.log("All cbsa ids mapped to metro/micro locations.");
  }

  return stationsObj;
}

module.exports = addMetroMicro;
