const formatAllStations = require('./formatallstations.js');

// Add state names to station location info.
function addStateNames(stationsObj) {

  // Build station to state map
  let stationStateMap = formatAllStations();

  for (let station in stationsObj) {
    if (stationStateMap[station]) {
      let state = stationStateMap[station];
      stationsObj[station]["state"] = state;
    } else {
      console.log("Missing state information for: " + station);
    }
  }
  return stationsObj;
}

module.exports = addStateNames;
