const formatStateNumbers = require('./formatstatenumbers.js');

// Takes the Census Bureau's text file listing state names and numbers and creates
// stateNumbersObj, which contains key-value pairs mapping the state number
// in the zcta data to the actual state names: { 1: "Alabama", etc. }. Note, the
// numbers are not 1-50 but 1-78 with some gaps.
function buildStateNumMap(data) {
  let stateNumbersArray = formatStateNumbers(data);
  let stateNumbersObj = {};

  for (let i = 0; i < stateNumbersArray.length; i++) {
    let stateNum = stateNumbersArray[i][0];
    let stateName = stateNumbersArray[i][2];
    stateNumbersObj[stateNum] = stateName;
  }

  return stateNumbersObj;
}

module.exports = buildStateNumMap;
