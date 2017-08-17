const fs = require('fs');

// Build a map between CBSA ID numbers and their metro/micro area names.
function buildCbsaMap() {

  // Census data list xls file of zips to cbsa info, with relevant parts extracted
  // and converted to a csv file.
  // source: http://www.census.gov/population/metro/files/lists/2015/List1.xls
  const rawCbsaData = fs.readFileSync('data/cbsa-data.csv', 'utf8');

  // Remove double quotes (Added by .csv format, but they get in the way for what I'm doing)
  let cbsaData = rawCbsaData.replace(/["]+/g, "");

  // Break each line of stationData into an element in an array
  cbsaData = cbsaData.split('\n');

  // Ensure excess white space is trimmed
  cbsaData = cbsaData.map(function(entry) {
    return entry.replace(/\s+/g, " ");
  });

  // Break each line into its own array, with each comma seperated value being an element.
  let cbsaData2 = [];
  for (let i of cbsaData) {
    cbsaData2.push(i.split(","));
  }

  // Some editors add empty line, resulting in last array being empty.  Test for this
  // (empty string is falsey), and then remove that element.
  if ( !cbsaData2[cbsaData2.length - 1][0] ) {
    cbsaData2.pop();
  };

  // remove space before state name (" OH" -> "OH").
  for (let arr of cbsaData2) {
    let state = arr[2];
    state = state.trim();
    arr[2] = state;
  }

  // Build object and eliminate duplicates
  let cbsaObj = {};
  for (let arr of cbsaData2) {
    let code = arr[0];
    if (cbsaObj[code]) {
      continue;
    } else {
      let area = arr[1];
      let states = arr[2];
      let type = arr[3]; // Currently full name. Consider shortening to metro/micro?
      cbsaObj[code] = {
        "area": area,
        "states": states,
        "type": type
      }
    }
  }
  return cbsaObj;
}

module.exports = buildCbsaMap;
