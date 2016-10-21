// Find the min and max zip code values for each state.

function buildZipRange(zipObj) {

  // Build and obj like this { Ohio: [all zips], virginia: [all zips], etc] }
  let rangeObj = {};
  for (let zip in zipObj) {
    let state = zipObj[zip];
    if (rangeObj[state]) {
      rangeObj[state].push(zip);
    } else {
      rangeObj[state] = [zip];
    }
  }

  // Change obj to { Ohio: [low zip, high zip], virginia: [low zip, high zip], etc] }
  for (let state in rangeObj) {
    let stateArray = rangeObj[state];
    let min = Math.min(...stateArray);
    let max = Math.max(...stateArray);
    rangeObj[state] = [min, max];
  }

  return rangeObj;
}

module.exports = buildZipRange;
