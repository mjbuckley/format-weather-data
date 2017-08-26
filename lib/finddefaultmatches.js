// This function finds the station matches for the default weather values (found at
// inputMinMax[weatherValue][2]). This is to prepopulate the matches state in the app.
// Note that this returns an object in the form of {"defaultMatches": [station matches]}
// because it's easier to move around that way (although I'm sure there's a better way).
// WARNING: This file must be manually updated when new data is added to stationsObj!
function findDefaultMatches(stationsObj, inputMinMax) {

  let stationMatch = [];
  for (let station in stationsObj) {

    if (stationsObj[station]["mTmxAv"][12] <= inputMinMax["hMTmxAvLe"][2] &&
        stationsObj[station]["mTmnAv"][12] >= inputMinMax["lMTmnAvGe"][2] &&
        stationsObj[station]["andSnGe1"] <= inputMinMax["andSnGe1Le"][2] &&
        stationsObj[station]["andSnGe1"] >= inputMinMax["andSnGe1Ge"][2] &&
        stationsObj[station]["andSnCGe1"] <= inputMinMax["andSnCGe1Le"][2] &&
        stationsObj[station]["andSnCGe1"] >= inputMinMax["andSnCGe1Ge"][2] &&
        stationsObj[station]["andPrGe5Ti"] <= inputMinMax["andPrGe5TiLe"][2] &&
        stationsObj[station]["andPrGe5Ti"] >= inputMinMax["andPrGe5TiGe"][2] &&
        stationsObj[station]["andTmnLe32"] <= inputMinMax["andTmnLe32Le"][2] &&
        stationsObj[station]["andTmnLe32"] >= inputMinMax["andTmnLe32Ge"][2] &&
        stationsObj[station]["andTmxGe60"] <= inputMinMax["andTmxGe60Le"][2] &&
        stationsObj[station]["andTmxGe60"] >= inputMinMax["andTmxGe60Ge"][2] &&
        stationsObj[station]["andTmxGe80"] <= inputMinMax["andTmxGe80Le"][2] &&
        stationsObj[station]["andTmxGe80"] >= inputMinMax["andTmxGe80Ge"][2]) {

        stationMatch.push(station);
    };
  };


  return {"defaultMatches": stationMatch};
}

module.exports = findDefaultMatches;
