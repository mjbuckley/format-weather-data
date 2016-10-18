// Takes the state number info from http://www2.census.gov/geo/docs/reference/state.txt
// and break it into a useable form. Each line in the data becomes an array, and
// each entry on a line is an element in that array.

function formatStateNumbers(data) {
  // Break each line of state numbers data into an element in an array
  let dataArray = data.split('\n');

  // Ensure excess white space is trimmed
  dataArray = dataArray.map(function(entry) {
    return entry.replace(/\s+/g, " ");
  });

  // First element should be the key to the data, not the data itself. Test for
  // this and remove.
  if (dataArray[0] === "STATE|STUSAB|STATE_NAME|STATENS") {
    dataArray.shift();
  };

  // Break each line into its own array, with each data point (seperated by a |)
  // being an element in that array.
  let dataArray2 = [];
  for (let i of dataArray) {
    dataArray2.push(i.split("|"));
  }

  // Check if last element of array is an empty string (some editors add a blank line
  // to the end of files, causing the empty array). Test for this (empty string is falsey),
  // and then remove that element.
  if ( !dataArray2[dataArray2.length - 1][0] ) {
    dataArray2.pop();
  };

  return dataArray2;
}

module.exports = formatStateNumbers;
