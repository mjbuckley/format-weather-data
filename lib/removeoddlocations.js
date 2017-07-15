// Function removes stations from stationsObj that are not in one of the 50 states or DC.
// In future might also check for other odd locations like water stations.

function removeOddLocations(stationsObj) {

  // Abbreviations for the 50 states and DC
  const goodLocations = [
    "AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DC", "DE", "FL", "GA", "HI", "ID",
    "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD", "MA", "MI", "MN", "MS", "MO",
    "MT", "NE", "NV", "NH", "NJ", "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA",
    "RI", "SC", "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY"];

    // Remove stations that are not in goodLocations
    for (let station in stationsObj) {
      if (!goodLocations.includes(stationsObj[station]["state"])) {
        delete stationsObj[station];
      }
    };

    return stationsObj;
}

module.exports = removeOddLocations;
