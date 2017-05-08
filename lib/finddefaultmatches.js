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

  const defaultHMTmxAvLe = parseInt(minMaxArray["mTmxAv"][2], 10);

  const defaultLMTmnAvGe = parseInt(minMaxArray["mTmnAv"][2], 10);

  const defaultAndSnGe1Le = parseInt(minMaxArray["andSnGe1"][2], 10);
  const defaultAndSnGe1Ge = parseInt(minMaxArray["andSnGe1"][2], 10);

  const defaultAndSnCGe1Le = parseInt(minMaxArray["andSnCGe1"][2], 10);
  const defaultAndSnCGeGe1 = parseInt(minMaxArray["andSnCGe1"][2], 10);

  const defaultAndPrGe5TiLe = parseInt(minMaxArray["andPrGe5Ti"][2], 10);
  const defaultAndPrGe5TiGe = parseInt(minMaxArray["andPrGe5Ti"][2], 10);

  const defaultAndTmnLe32Le = parseInt(minMaxArray["andTmnLe32"][2], 10);
  const defaultAndTmnLe32Ge = parseInt(minMaxArray["andTmnLe32"][2], 10);

  const defaultAndTmxGe60Le = parseInt(minMaxArray["andTmxGe60"][2], 10);
  const defaultAndTmxGe60Ge = parseInt(minMaxArray["andTmxGe60"][2], 10);

  const defaultAndTmxGe80Le = parseInt(minMaxArray["andTmxGe80"][2], 10);
  const defaultAndTmxGe80Ge = parseInt(minMaxArray["andTmxGe80"][2], 10);

  Object.keys(stationsObj).forEach(function(station) {
    
    if (parseInt(stationsObj[station]["mTmxAv"][12], 10) <= defaultHMTmxAvLe &&

        parseInt(stationsObj[station]["mTmnAv"][12], 10) >= defaultLMTmnAvGe &&

        parseInt(stationsObj[station]["andSnGe1"], 10) <= defaultAndSnGe1Le &&
        parseInt(stationsObj[station]["andSnGe1"], 10) >= defaultAndSnGe1Ge &&

        parseInt(stationsObj[station]["andSnCGe1"], 10) <= defaultAndSnGe1Le &&
        parseInt(stationsObj[station]["andSnCGe1"], 10) >= defaultAndSnGe1Ge &&

        parseInt(stationsObj[station]["andPrGe5Ti"], 10) <= defaultAndPrGe5TiLe &&
        parseInt(stationsObj[station]["andPrGe5Ti"], 10) >= defaultAndPrGe5TiGe &&

        parseInt(stationsObj[station]["andTmnLe32"], 10) <= defaultAndTmnLe32Le &&
        parseInt(stationsObj[station]["andTmnLe32"], 10) >= defaultAndTmnLe32Ge &&

        parseInt(stationsObj[station]["andTmxGe60"], 10) <= defaultAndTmxGe60Le &&
        parseInt(stationsObj[station]["andTmxGe60"], 10) >= defaultAndTmxGe60Ge &&

        parseInt(stationsObj[station]["andTmxGe80"], 10) <= defaultAndTmxGe80Le &&
        parseInt(stationsObj[station]["andTmxGe80"], 10) >= defaultAndTmxGe80Ge) {

      matches.push(station);
    }
  });

  return {"defaultMatches": matches};
}

module.exports = findDefaultMatches;
