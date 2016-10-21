// some zips for very small pop places are not in the zcta data. Here I use the zip ranges to
// try to make a best guess for those unincluded zips. Note that state zip codes are mostly grouped
// together, but there are occasional zips that are out of order. To try and catch these issues I
// compare against all ranges. If there is only range that fits then it is likely a match. If more
// than one range fits, then I will need to manually resolve it.

const buildZipRange = require('./buildziprange.js');

function fitZipsToRange(zipObj, stationsObj) {

  let zipRange = buildZipRange(zipObj); // { Ohio: [low zip, high zip], virginia: [low zip, high zip], etc] }

  for (let station in stationsObj) {
    if (stationsObj[station]["location"]["state"] === undefined) {

      let zip = stationsObj[station]["location"]["zip"];
      let matches = [];

      // Find which state range(s) the zip falls within
      for (let state in zipRange) {
        let min = zipRange[state][0];
        let max = zipRange[state][1];
        if (zip >= min && zip <= max) {
          matches.push(state);
        }
      }

      if (matches.length === 1) { // Can reasonably assume zip belongs to match
        stationsObj[station]["location"]["state"] = matches[0];
      } else if (matches.length > 1) { // More than one match so need to manuall resolve
        console.log(zip + " had more than 1 match.");
      } else { // Not sure what would cause this, but take a look.
        console.log(zip + " had no matches. Station Info:")
        console.log(stationsObj[station]);
      }
    }
  }
  return stationsObj;
}

module.exports = fitZipsToRange;
