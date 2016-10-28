// Takes census bureau's ZCTA to CBSA file:
// http://www2.census.gov/geo/docs/maps-data/data/rel/zcta_cbsa_rel_10.txt
// and format it in a useable way and extract only the info I need. Results in this array:
// [ [zip, cbsa#, memi#], etc. ].


function formatHudCsv(data) {
  // Break each line of stationData into an element in an array
  let dataArray = data.split('\n');

  // Ensure excess white space is trimmed
  dataArray = dataArray.map(function(entry) {
    return entry.replace(/\s+/g, " ");
  });


  // Break each line into its own array, with each word being an element.
  // Note that this breaks multi word city names into multiple elements (fix later)
  let dataArray2 = [];
  for (let i of dataArray) {
    dataArray2.push(i.split(","));
  }

  // Check if last element of array is an empty string (some editors add a blank line
  // to the end of files, causing the empty array). Test for this (empty string is falsey),
  // and then remove that element.
  if ( !dataArray2[dataArray2.length - 1][0] ) {
    dataArray2.pop();
  };

  return dataArray2;
}

module.exports = formatHudCsv;
