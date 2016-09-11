// Setup initial object for weather data.  Will create an object with the weather
// station ID as a key pointing to an object that will contain that stations info.
// THis code just sets up the list of keys and adds zip/city info.

const fs = require('fs');
const stationData = fs.readFileSync('zipcodes-normals-stations.txt', 'utf8');
// const stationData = fs.readFileSync('ziptest.txt', 'utf8');

// Break each line of stationData into an element in an array
let stationDataArray = stationData.split('\n');

// Ensure excess white space is trimmed
stationDataArray = stationDataArray.map(function(entry) {
  return entry.replace(/\s+/g, " ");
});

// Break each line into its own array, with each word being an element.
// Note that this breaks multi word city names into multiple elements (fix later)
let stationDataArray2 = [];
for (let i of stationDataArray) {
  stationDataArray2.push(i.split(" "));
}

// Above results last element of array being an empty string.  Test for this
// (empty string is falsey), and then remove that elemtnt.
if ( !stationDataArray2[stationDataArray2.length - 1][0] ) {
  stationDataArray2.pop();
};

let stationObj = {};
for (let i of stationDataArray2) {
  let cityName = "";
  for (let j=2; j<i.length; j++) {
    if (j === 2) {
      cityName = cityName + i[j];
    } else {
      cityName = cityName + " " + i[j];
    }
  }
  const station = i[0];

  stationObj[station] = {
    location: {
      "zip": i[1],
      "city": cityName
    }
  };
}


// snow_convert.js below, seperate better in future

// const snowData = fs.readFileSync('snow_data.txt', 'utf8');
const snowData = fs.readFileSync('ann-snow-avgnds-ge010ti.txt', 'utf8');

let snowDataArray = snowData.split('\n');


snowDataArray = snowDataArray.map(function(entry) {
  return entry.replace(/\s+/g, " ");
});


let snowDataArray2 = [];
for (let i of snowDataArray) {
  snowDataArray2.push(i.split(" "));
}

// Above results last element of array being an empty string.  Test for this
// (empty string is falsey), and then remove that elemtnt.
if ( !snowDataArray2[snowDataArray2.length - 1][0] ) {
  snowDataArray2.pop();
};

// seperate flags from values (but keep for future reference) and convert -7777
// to 0.  Stll need to deal with other negative values.
snowDataArray2 = snowDataArray2.map(function(array) {
  let snowValue = array[1];
  let lastChar = snowValue.charAt(snowValue.length - 1);
  if (lastChar == "C" || "S" || "R" || "P" || "Q") {
    snowValue = snowValue.replace(/P|S|R|Q|C/gi, "");
    array[2] = lastChar;
  } else {
    array[2] = "missing";
  };

  if (snowValue == "-7777") {
    array[1] = "0";
  } else {
    array[1] = snowValue;
  };
  return array;
});

// if length === 1, add 0. to beginning, else add . to length-1.
snowDataArray2 = snowDataArray2.map(function(array) {
  const snowValue = array[1];
  const length = snowValue.length;
  if (length === 1) {
    array[1] = "0." + snowValue;
  } else {
    array[1] = snowValue.slice(0, -1) + "." + snowValue.slice(-1);
  };
  return array;
});

let errors = [];

for (let i of snowDataArray2) {
  const station = i[0];
  const snowfall = i[1];
  const flag = i[2];
  const snowObj = {
      "inchplus": snowfall,
      "inchplusflag": flag
  };

  if (stationObj[station]) {
    // stationObj[station] = {
    //   "snow": snowObj
    // };
    stationObj[station]["snow"] = snowObj;
  } else {
    errors.push(station);
  }
};

console.log(stationObj);
console.log("errors: " + errors);
