// This function finds the station matches for the default weather values (found at
// minMaxArray[weatherValue][2]). This is to prepopulate the matches state in the app.
// Note that this returns an object in the form of {"defaultMatches": [station matches]}
// because it's easier to move around that way (although I'm sure there's a better way).
// WARNING: This file must be manually updated when new data is added to stationsObj!


function findDefaultMatches(stationsObj, minMaxArray) {

  let matches = [];

  const defaultMTmxAv = parseInt(minMaxArray["mTmxAv"][2], 10);
  const defaultMTmnAv = parseInt(minMaxArray["mTmnAv"][2], 10);
  const defaultAndSnGe1 = parseInt(minMaxArray["andSnGe1"][2], 10);
  const defaultAndSnCGe1 = parseInt(minMaxArray["andSnCGe1"][2], 10);
  const defaultAndPrGe5Ti = parseInt(minMaxArray["andPrGe5Ti"][2], 10);
  const defaultAndTmnLe32 = parseInt(minMaxArray["andTmnLe32"][2], 10);
  const defaultAndTmxGe60 = parseInt(minMaxArray["andTmxGe60"][2], 10);
  const defaultAndTmxGe80 = parseInt(minMaxArray["andTmxGe80"][2], 10);

  Object.keys(stationsObj).forEach(function(station) {
    if (parseInt(stationsObj[station]["mTmxAv"][12], 10) < defaultMTmxAv &&
        parseInt(stationsObj[station]["mTmnAv"][12], 10) > defaultMTmnAv &&
        parseInt(stationsObj[station]["andSnGe1"], 10) < defaultAndSnGe1 &&
        parseInt(stationsObj[station]["andSnCGe1"], 10) < defaultAndSnGe1 &&
        parseInt(stationsObj[station]["andPrGe5Ti"], 10) < defaultAndPrGe5Ti &&
        parseInt(stationsObj[station]["andTmnLe32"], 10) < defaultAndTmnLe32 &&
        parseInt(stationsObj[station]["andTmxGe60"], 10) > defaultAndTmxGe60 &&
        parseInt(stationsObj[station]["andTmxGe80"], 10) > defaultAndTmxGe80) {

      matches.push(station);
    }
  });

  return {"defaultMatches": matches};
}

module.exports = findDefaultMatches;
