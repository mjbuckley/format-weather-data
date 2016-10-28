const buildCbsaMap = require('./buildcbsamap.js');
// const buildZctaToCbsaMap = require('./buildzctatocbsamap.js');
const buildZipToCbsaMap = require('./buildziptocbsamap.js');


// Add the names of the metro and micropolitan areas that a station belongs
// to (if any). Note that its possible for a station to belong to multiple areas,
// and all areas are added to the area array if it does.
function addMetroMicro(stationsObj) {

  // // Build map of ZCTA zips to CBSA numbers.
  // let zctaToCbsaMap = buildZctaToCbsaMap();
  //
  // for (let station in stationsObj) {
  //   let zip = stationsObj[station]["location"]["zip"];
  //   if (zctaToCbsaMap[zip]) {
  //     let cbsaArr = zctaToCbsaMap[zip]; // this is an array
  //     for (let i = 0; i < cbsaArr.length; i++) {
  //       let cbsaNum = cbsaArr[i];
  //         stationsObj[station]["location"]["area"].push(cbsaNum);
  //     }
  //   }
  // }

  let zipToCbsaMap = buildZipToCbsaMap(); // { zip: [cbsa1, cbsa2], etc. }

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


  // Build map of CBSA numbers to metro/micro names
  let cbsaMap = buildCbsaMap(); // { cbsaCode: { area: "Columbus", state: "Ohio", type: "metrop..." }, etc. }
  // console.log(cbsaMap["19780"]);
  // I know that at this point the cbsa map contains codes (such as 19780) that are later coming
  // up as not existing. Problem starts below. NOTE: that I'm not sure if I should be treating the
  // codes as strings or nums (although both work in the above example, it could cause problems in other
  // places).

  let missing = [];

  // Change cbsa ids to actual names
  for (let station in stationsObj) {
    if (stationsObj[station]["location"]["area"].length > 0) { // Check if station has any cbsa codes
      let areaArr = stationsObj[station]["location"]["area"]; // grab array of current codes. Ex: [23432, 23433]
      let replacement = [];
      for (let i = 0; i < areaArr.length; i++) { // loop through current codes array and change codes to names
        let cbsaValue = parseInt(areaArr[i], 10); // cbsa code for current iteration.

        if (cbsaMap[cbsaValue]) { // check if cbsa code is in cbsa to city name map
          let cbsaName = cbsaMap[cbsaValue]["area"]; // find name for code
          replacement.push(cbsaName);



          // stationsObj[station]["location"]["area"] = stationsObj[station]["location"]["area"].splice(i, 1, cbsaName); // replace code with name

          // console.log(stationsObj[station]["location"]["area"]);
        // } else { // cbsa code not in cbsa to name map
        //   if (cbsaValue == 99999) {
        //     continue;
        //   } else {
        //     console.log(cbsaValue + " is not in the cbsa to name map.");
        //   }
        } else {
          missing.push(cbsaValue);
          console.log(cbsaValue);
        }
      }
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
