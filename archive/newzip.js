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


// Takes NOAA ASCII formatted weather data and breaks data up into a useable
// form. Each line becomes an array, and each entry on a line is an element in
// that array.  NOTE: this will split multiple words in same column into
// different elements.  Most data does not have multiple words, but be aware of
// and fix later if needed.
function formatNoaaData(data) {
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
    dataArray2.push(i.split(" "));
  }

  // Above results last element of array being an empty string.  Test for this
  // (empty string is falsey), and then remove that elemtnt.
  if ( !dataArray2[dataArray2.length - 1][0] ) {
    dataArray2.pop();
  };

  return dataArray2;
}


// Take formatted weather data and create zip obj.
function createZipObj(data) {
  let stationObj = {};
  for (let i of data) {
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

  return stationObj;
}

// Takes formatted 2 column NOAA weather data and strips flag from value and
// then adds flag to array as a separate element.  If no flag pressent, then
// new element is given a value of "missing"
function separateFlags2C(data) {
  data = data.map(function(array) {
    let amount = array[1];
    let lastChar = amount.charAt(amount.length - 1);
    if (lastChar == "C" || "S" || "R" || "P" || "Q") {
      amount = amount.replace(/P|S|R|Q|C/gi, "");
      array[2] = lastChar;
    } else {
      array[2] = "missing";
    };
    return array;
  });
};



// Takes formatted NOAA weather data (where flag have been separated and values
// are in the [1] spot in the array) and deals with NOAA special values that are
// in that spot. Right now this is only fixes -7777 (changes it to 0) because I
// haven't come across any other special values being used, but they would be
// dealt with here if I do.
function fixSpecialValues(data) {
  data = data.map(function(array) {
    let amount = array[1];
    if (amount == "-7777") {
      array[1] = "0";
    } else {
      array[1] = amount;
    };
    return array;
  });
};
