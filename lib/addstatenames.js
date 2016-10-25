const formatAllStations = require('./formatallstations.js');

// Add state names to station location info
function addStateNames(stationsObj) {

  let stationStateMap = formatAllStations();

  for (let station in stationsObj) {
    if (stationStateMap[station]) {
      let state = stationStateMap[station];
      stationsObj[station]["location"]["state"] = state;
    } else {
      console.log("Missing information for:" + station);
    }
  }

  return stationsObj;
}

module.exports = addStateNames;
