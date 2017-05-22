// This function finds the station matches for the default weather values (found at
// minMaxArray[weatherValue][2]). This is to prepopulate the matches state in the app.
// Note that this returns an object in the form of {"defaultMatches": [station matches]}
// because it's easier to move around that way (although I'm sure there's a better way).
// WARNING: This file must be manually updated when new data is added to stationsObj!

// NOTE that since I added >= and <= options my default values (and thus default
// matches) make no sense (logically correct/complete, but practically useless). Fix this
// eventually (both here and in minMaxArray).

function findDefaultMatches(stationsObj, minMaxArray) {

  let matches = [];

  const defaultHMTmxAvLe = minMaxArray["mTmxAv"][2];

  const defaultLMTmnAvGe = minMaxArray["mTmnAv"][2];

  const defaultAndSnGe1Le = minMaxArray["andSnGe1"][2];
  const defaultAndSnGe1Ge = minMaxArray["andSnGe1"][2];

  const defaultAndSnCGe1Le = minMaxArray["andSnCGe1"][2];
  const defaultAndSnCGeGe1 = minMaxArray["andSnCGe1"][2];

  const defaultAndPrGe5TiLe = minMaxArray["andPrGe5Ti"][2];
  const defaultAndPrGe5TiGe = minMaxArray["andPrGe5Ti"][2];

  const defaultAndTmnLe32Le = minMaxArray["andTmnLe32"][2];
  const defaultAndTmnLe32Ge = minMaxArray["andTmnLe32"][2];

  const defaultAndTmxGe60Le = minMaxArray["andTmxGe60"][2];
  const defaultAndTmxGe60Ge = minMaxArray["andTmxGe60"][2];

  const defaultAndTmxGe80Le = minMaxArray["andTmxGe80"][2];
  const defaultAndTmxGe80Ge = minMaxArray["andTmxGe80"][2];

  Object.keys(stationsObj).forEach(function(station) {

    if (stationsObj[station]["mTmxAv"][12] <= defaultHMTmxAvLe &&

        stationsObj[station]["mTmnAv"][12] >= defaultLMTmnAvGe &&

        stationsObj[station]["andSnGe1"] <= defaultAndSnGe1Le &&
        stationsObj[station]["andSnGe1"] >= defaultAndSnGe1Ge &&

        stationsObj[station]["andSnCGe1"] <= defaultAndSnGe1Le &&
        stationsObj[station]["andSnCGe1"] >= defaultAndSnGe1Ge &&

        stationsObj[station]["andPrGe5Ti"] <= defaultAndPrGe5TiLe &&
        stationsObj[station]["andPrGe5Ti"] >= defaultAndPrGe5TiGe &&

        stationsObj[station]["andTmnLe32"] <= defaultAndTmnLe32Le &&
        stationsObj[station]["andTmnLe32"] >= defaultAndTmnLe32Ge &&

        stationsObj[station]["andTmxGe60"] <= defaultAndTmxGe60Le &&
        stationsObj[station]["andTmxGe60"] >= defaultAndTmxGe60Ge &&

        stationsObj[station]["andTmxGe80"] <= defaultAndTmxGe80Le &&
        stationsObj[station]["andTmxGe80"] >= defaultAndTmxGe80Ge) {

      matches.push(station);
    }
  });

  return {"defaultMatches": matches};
}

module.exports = findDefaultMatches;
