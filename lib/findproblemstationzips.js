// problems is a list of zips that fall in two states. But there may be no stations that
// actually have those zips. The code below checks if any stations have a problem zip, and if yes,
// it then adds them to the problemStations object (as of 10/16/16, none of the stations I'm using have a
// problem zip, although I believe some NOAA stations do have problem zips, I just happen
// not to be using any of those stations based on the specific weather info I'm using).
function findProblemStationZips(problems, stationsObj) {
  let problemZips = Object.keys(problems); // Array of problem zips
  let problemStations = {};

  for (let obj in stationsObj) {
    let stationZip = stationsObj[obj]["location"]["zip"];
    if (problemZips.indexOf(stationZip) > -1) {
      problemStations[obj] = stationsObj[obj];
    }
  };

  return problemStations;
}

module.exports = findProblemStationZips;
