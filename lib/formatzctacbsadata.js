// Takes census bureau's ZCTA to CBSA file:
// http://www2.census.gov/geo/docs/maps-data/data/rel/zcta_cbsa_rel_10.txt
// and format it in a useable way and extract only the info I need. Results in this array:
// [ [zip, cbsa#, memi#], etc. ].


function formatZctaCbsaData(data) {
  // Break each line of stationData into an element in an array
  let dataArray = data.split('\n');

  // Ensure excess white space is trimmed
  dataArray = dataArray.map(function(entry) {
    return entry.replace(/\s+/g, " ");
  });

  // First element should be the key to the data, not the data itself. Test for
  // this and remove.
  if (dataArray[0] ===
    "ZCTA5,CBSA,MEMI,POPPT,HUPT,AREAPT,AREALANDPT,ZPOP,ZHU,ZAREA,ZAREALAND,MPOP,MHU,MAREA,MAREALAND,ZPOPPCT,ZHUPCT,ZAREAPCT,ZAREALANDPCT,MPOPPCT,MHUPCT,MAREAPCT,MAREALANDPCT"
  ) {
    dataArray.shift();
  };

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

  // Remove everything except zip, metro/micro ID number, and memi num (I believe 1 means
  // metro area, 2 means micropolitan area, but I can't find this documented anywhere).
  dataArray2 = dataArray2.map(function(arr) {
    let newArray = [];
    newArray.push(arr[0]);
    newArray.push(arr[1]);
    newArray.push(arr[2]);
    return newArray;
  });

  return dataArray2;
}

module.exports = formatZctaCbsaData;
