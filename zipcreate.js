const fs = require('fs');
const formatZctaData = require('./lib/formatzctadata.js');
const formatStateNumbers = require('./lib/formatstatenumbers.js');

const zipData = fs.readFileSync('data/zcta_place_rel_10.txt', 'utf8');
let zipArray = formatZctaData(zipData);

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

console.log(problems);

// Will need to do something like checking in if the zip is in zipObj, if yes, use
// state info, else go to a switch statement with the values that I have manually
// resolved.


// NOTE: This works but there are two problems: (1) There is an undefine value at the
// end (probably caused by line return or blank space), and (2) the key at the top of the
// data is also included in the array. FIX (although for how I will be using it's not really
// a problem).
// Create stateNumbersObj, which contains key-value pairs mapping the state number
// in the zcta data to the actual state names: { 1: "Alabama", etc. }. Note, the
// numbers are not 1-50 but 1-78 with some gaps.
const stateNumersData = fs.readFileSync('data/state-numbers.txt', 'utf8');
stateNumbersObj = {};
let stateNumbersArray = formatStateNumbers(stateNumersData);

for (let i = 0; i < stateNumbersArray.length; i++) {
  let stateNum = stateNumbersArray[i][0];
  let stateName = stateNumbersArray[i][2];
  stateNumbersObj[stateNum] = stateName;
}

console.log(stateNumbersObj);
