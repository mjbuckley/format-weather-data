// This is not currently being used but keeping around because I might add back in the
// data that uses this.
//
// This is exactly the same as formatnoaadata.js expect for the addition of the
// use of trim(). I was getting an extra element on every other month that consisted
// of a blank space. I assumed this was because of some sort of spacing issue and
// trim() fixed it. I think I could have just added trim() to formatnoaadata.js, but
// I made this seperate function just to be sure.

function formatDlyTMinMax(data) {

  // Break each line of stationData into an element in an array
  let dataArray = data.split('\n');

  // Ensure excess white space is trimmed
  dataArray = dataArray.map(function(entry) {
    return entry.replace(/\s+/g, " ");
  });

  // Test
  dataArray = dataArray.map(function(entry) {
    return entry.trim();
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

module.exports = formatDlyTMinMax;
