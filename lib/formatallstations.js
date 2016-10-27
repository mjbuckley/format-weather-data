const fs = require('fs');
const formatNoaaData = require('./formatnoaadata.js');


// Build map between station IDs and states using NOAA allstations data.
function formatAllStations() {
  const allStations = fs.readFileSync('./data/allstations.txt', 'utf8');
  const formattedAllStations = formatNoaaData(allStations);

  let stationStateMap = {};
  for (let arr of formattedAllStations) {
    let station = arr[0];
    let state = arr[4];
    stationStateMap[station] = state;
  }

  return stationStateMap;
}

module.exports = formatAllStations;
