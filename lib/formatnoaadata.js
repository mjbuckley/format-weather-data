// Takes NOAA weather data and breaks the data up into a useable form. Each line
// in the data becomes an array, and each entry on a line is an element in
// that array. NOTE: this will split multiple words in same column into
// different elements. Most data does not have multiple words, but be aware of
// and fix later if needed.

function formatNoaaData(data) {

  // Break each line of stationData into an element in an array
  let dataArray = data.split('\n');

  // Ensure excess white space is trimmed
  dataArray = dataArray.map(function(entry) {
    return entry.replace(/\s+/g, " ");
  });

  // Break each line into its own array, with each word being an element.
  // Note that this breaks multi word city names into multiple elements (will be fixed later)
  let dataArray2 = [];
  for (let i of dataArray) {
    dataArray2.push(i.split(" "));
  }

  // Some editors add an empty line at the end of files, resulting in the the last array
  // being an empty string.  Test for this (empty string is falsey), and then remove that elemtnt.
  if ( !dataArray2[dataArray2.length - 1][0] ) {
    dataArray2.pop();
  };

  return dataArray2;
}

module.exports = formatNoaaData;
