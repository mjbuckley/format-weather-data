const fs = require('fs');
const buildStateNumMap = require('./buildstatenummap.js');

// Takes zipObj and replaces the state numbers with the state name.
function mapNumToState(zipObj) {
  const stateNumData = fs.readFileSync('./data/state-numbers.txt', 'utf8');
  let stateNumMap = buildStateNumMap(stateNumData);

  // Change states in zipObj from numbers to state names
  for (let zip in zipObj) {
    let state = zipObj[zip];
    let newState = stateNumMap[state];
    zipObj[zip] = newState;
  }

  return zipObj;
}

module.exports = mapNumToState;
