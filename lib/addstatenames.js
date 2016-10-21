// STILL NEED TO FIGURE OUT WHAT TO DO WITH PROBLEMS
const fs = require('fs');
const formatZctaData = require('./formatzctadata.js');
const mapNumToState = require('./mapnumtostate.js');
const findProblemStationZips = require('./findproblemstationzips.js');
const buildStateZipMap = require('./buildstatezipmap.js');
const fitZipsToRange = require('./fitzipstorange.js');

function addStateNames(stationsObj) {
  // Take Census Bureau ZCTA raw data and transform into an array with each element
  // cosisting of an array of a zip and its state number. Ex: [ [12345, 14], [12567, 14], etc.]
  const zipData = fs.readFileSync('data/zcta_place_rel_10.txt', 'utf8');
  let zipArray = formatZctaData(zipData);


  // Filter out problem zips that map to two states, remove duplicates, and build an object
  // mapping zips to state: { 12345: 14, 12567: 14, etc. }.
  let stateZipMap = buildStateZipMap(zipArray);
  let zipObj = stateZipMap[0]; // zip to state map (minus problem zips)
  let problems = stateZipMap[1]; // zips that map to two state

  // Find out if any stations have a problem zip.
  let problemStations = findProblemStationZips(problems, stationsObj);
  let length = Object.keys(problemStations).length;
  console.log("There were " + length + " stations with a problem zip that mapped to two states.");
  // Need to do something if they exist.


  // Change the state numbners in zipObj to state names
  zipObj = mapNumToState(zipObj);


  // Add state names to stationsObj. DEAL WITH ERRORS.
  for (let station in stationsObj) {
    let zip = stationsObj[station]["location"]["zip"];
    let state = zipObj[zip];
    // if (zipObj[zip]) {
    //   continue;
    // } else {
    //   console.log(zip);
    //   continue;
    // }
    stationsObj[station]["location"]["state"] = state;
  }


  // Some zips are not in zcta data. This makes an intelligent guess as to the state
  // for these missing zips. See function for more info.
  stationsObj = fitZipsToRange(zipObj, stationsObj);


  return stationsObj;
}

module.exports = addStateNames;
