// This creates zipObj, which contains every zip code and the state that it
// maps to { 43220: Ohio, 43221: Ohio, etc. }. Two important notes:
// (1) The way the ZCTA data is set up means that the same zip may be listed many times.
// This exaplains why there are so many odd checks below.
// (2) Zips occasionally map to 2 states (there are 13 that I found). If a zip maps to
// 2 states it is removed from zipObj and added to the probelms object in the form of
// { zipcode: [statenum1, statenum2], etc. }. Any station with a zip in the problems
// object will need to be manually resolved.

function buildStateZipMap(zipArray) {
  let zipObj = {}; // Map of zip to state
  let problems = {}; // Zips that map to more than one state

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
    } else { // zip not present. check of not present because it is a problem, or just not yet added.
      if (problems[zip] && problems[zip].indexOf(state) > 0) {
        continue;
      } else if (problems[zip] && problems[zip].indexOf(state) === -1) {
        problems[zip].push(state);
      } else {
        zipObj[zip] = state;
      }
    }
  };

  return [zipObj, problems];
}

module.exports = buildStateZipMap;
