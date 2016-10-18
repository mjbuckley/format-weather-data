const fs = require('fs');
const formatZctaData = require('./lib/formatzctadata.js');
const formatStateNumbers = require('./lib/formatstatenumbers.js');
const stationsObj = require('./weather.json');


// Mapping zip codes to states is difficult (perhaps impossible), but the US Census
// Bureau Zip Code Tabulation Area data seems to be the best way I can relatively
// easily aproximate a mapping.
const zipData = fs.readFileSync('data/zcta_place_rel_10.txt', 'utf8');
let zipArray = formatZctaData(zipData);

console.log(zipArray[zipArray.length-1]);


// Remove everything except zip and state
zipArray = zipArray.map(function(arr) {
  let newArray = [];
  newArray.push(arr[0]);
  newArray.push(arr[1]);
  return newArray;
});


let zipObj = {}; // Map of zip to state
let problems = {}; // Zips that map to more than one state

// This creates a zipObj, which contains every zip code and the state that it
// maps to. There are 13 zip codes that map to two different states.
// I think my use of continue is ok, but some people really dislike continue so
// be double check what I'm doing is fine.
for (let arr of zipArray) {
  let zip = arr[0];
  let state = arr[1];

  if (zipObj[zip] && zipObj[zip] === state) { // zip already present and with same state info, do nothing.
    continue;
  } else if (zipObj[zip] && zipObj[zip] !== state) { // zip present but with different state info.
    // Need to remove zip from zip obj and add zip to problems obj.
    problems[zip] = [state];
    let badState = zipObj[zip];
    problems[zip].push(badState);
    delete zipObj[zip];
  } else { // zip not presen. check of not present because it is a problem, or just not yet added.
    if (problems[zip] && problems[zip].indexOf(state) > 0) {
      continue;
    } else if (problems[zip] && problems[zip].indexOf(state) === -1) {
      problems[zip].push(state);
    } else {
      zipObj[zip] = state;
    }
  }
};


// problems (and the problemZips array below) are a list of zips that fall in two
// states. But there may be no stations that actually have those zips. The below
// code checks if any stations have a problem zip and then adds them to the
// problemStations object (as of 10/16/16, none of the stations I'm using have a
// problem zip, although I believe some stations do have problem zips, I just happen
// not to be using them based on the specific weather info I'm using).

let problemZips = Object.keys(problems);
let problemStations = {};

// List of all stations that need to be manually assigned a zip
for (let obj in stationsObj) {
  let stationZip = stationsObj[obj]["location"]["zip"];
  if (problemZips.indexOf(stationZip) > -1) {
    problemStations[obj] = stationsObj[obj];
  }
};


// Create stateNumbersObj, which contains key-value pairs mapping the state number
// in the zcta data to the actual state names: { 1: "Alabama", etc. }. Note, the
// numbers are not 1-50 but 1-78 with some gaps.
const stateNumersData = fs.readFileSync('data/state-numbers.txt', 'utf8');
let stateNumbersArray = formatStateNumbers(stateNumersData);
let stateNumbersObj = {};

for (let i = 0; i < stateNumbersArray.length; i++) {
  let stateNum = stateNumbersArray[i][0];
  let stateName = stateNumbersArray[i][2];
  stateNumbersObj[stateNum] = stateName;
}


// Change states in zipObj from numbers to state names
for (let obj in zipObj) {
  let state = zipObj[obj];
  let newState = stateNumbersObj[state];
  zipObj[obj] = newState;
}
