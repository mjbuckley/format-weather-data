// Setup initial object for weather data.  Will create an object with the weather
// station ID as a key pointing to an object that will contain that stations info.
// THis code just sets up the list of keys and adds zip/city info.



var fs = require('fs');
var stationData = fs.readFileSync('ziptest.txt', 'utf8');

// Break each line of stationData into an element in an array
var stationDataArray = stationData.split('\n');

stationDataArray = stationDataArray.map(function(entry) {
  return entry.replace(/\s+/g, " ");
});
console.log(stationDataArray);


// Ensure excess white space is trimmed
var dataArray2 = [];
for(let i of dataArray) {
  dataArray2.push(i.replace(/\s+/g, " "));
};



// Break each line into its own array, with each word being an element.
// Note that this breaks multi word city names into multiple elements (fix later)
var dataArray3 = [];
for (let i of dataArray2) {
  dataArray3.push(i.split(" "));
}


// Above results in empty array.  Test for and remove it
if ( !dataArray3[dataArray3.length - 1][0] ) {
  dataArray3.pop();
};


var zipObj = {};
for (let i of dataArray3) {
  var cityName = "";
  for (let j=2; j<i.length; j++) {
    if (j === 2) {
      cityName = cityName + i[j];
    } else {
      cityName = cityName + " " + i[j];
    }
  }
  var station = i[0];

  zipObj[station] = {
    "zip": i[1],
    "city": cityName
  };
}

console.log(zipObj);
