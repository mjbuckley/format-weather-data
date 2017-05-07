// Run this file from the command line to create weather.json and minmax.json.
// weather.json contains all of the station and weather info needed for use in
// the weather app (see README for sample data and useage instructions).
// minmax.json contains the min and max values for each weather item.
// If the files already exist then they will be overwritten.


const addAbove60 = require('./lib/addabove60.js');
const addAbove80 = require('./lib/addabove80.js');
const addBelow32 = require('./lib/addBelow32.js');
// const addComfortable = require('./lib/addcomfortable.js');
const addMetroMicro = require('./lib/addmetromicro.js');
const addMlyTMax = require('./lib/addmlytmax.js');
const addMlyTMin = require('./lib/addmlytmin.js');
const addStateNames = require('./lib/addstatenames.js');
const buildMetroCityList = require('./lib/buildmetrocitylist.js');
const createMinMax = require('./lib/createminmax.js');
const createSharedCity = require('./lib/createsharedcity.js');
const createStationsObj = require('./lib/createstationsobj.js');
const findDefaultMatches = require('./lib/finddefaultmatches.js');
const fs = require('fs');
const inchPlusSnow = require('./lib/inchplussnow.js');
const inchPlusSnowGnd = require('./lib/inchplussnowgnd.js');
const rainGdHalfIn = require('./lib/raingdhalfin.js');
const sortByCity = require('./lib/sortbycity.js');


// Create stationsObj and build its initial structure. Built from NOAA's list of
// all station IDs and thier corresponding zipcodes and city names. Station IDs
// will be the keys of stationsObj, and the corresponding info will be stored as
// the value.
const stationData = fs.readFileSync('data/zipcodes-normals-stations.txt', 'utf8');
let stationsObj = createStationsObj(stationData);


// Add average numnber of days with at least an inch of snowfall to stationsObj.
const rawSnowData = fs.readFileSync('data/ann-snow-avgnds-ge010ti.txt', 'utf8');
stationsObj = inchPlusSnow(rawSnowData, stationsObj);


// Add average number of days with at least an inch of snow ground cover to stationsObj.
const snowGndData = fs.readFileSync('data/ann-snwd-avgnds-ge001wi.txt', 'utf8');
stationsObj = inchPlusSnowGnd(snowGndData, stationsObj);


// Add average number of days with at least 1/2 inch of precipitation to stationsObj
const rainGdHalfInData = fs.readFileSync('data/ann-prcp-avgnds-ge050hi.txt', 'utf8');
stationsObj = rainGdHalfIn(rainGdHalfInData, stationsObj);


// Add array of monthly average max temperature to stationsObj. Elements 0-11 are
// for jan-dec, element 12 is the highest of the 12 values.
const mlyTMaxData = fs.readFileSync('data/mly-tmax-normal.txt', 'utf8');
stationsObj = addMlyTMax(mlyTMaxData, stationsObj);


// Add array of monthly average min temperature to stationsObj. Elements 0-11 are
// for jan-dec, element 12 is the lowest of the 12 values.
const mlyTMinData = fs.readFileSync('data/mly-tmin-normal.txt', 'utf8');
stationsObj = addMlyTMin(mlyTMinData, stationsObj);


// Add average numnber of days where the temp drops below freezing to stationsObj.
const below32Data = fs.readFileSync('data/ann-tmin-avgnds-lsth032.txt', 'utf8');
stationsObj = addBelow32(below32Data, stationsObj);


// Add average number of days where the temperature gets above 60
const above60Data = fs.readFileSync('data/ann-tmax-avgnds-grth060.txt', 'utf8');
stationsObj = addAbove60(above60Data, stationsObj);


// Add average number of days where the temperature gets above 80
const above80Data = fs.readFileSync('data/ann-tmax-avgnds-grth080.txt', 'utf8');
stationsObj = addAbove80(above80Data, stationsObj);


// Not using below function, but keeping around here in case I change my mind.
// BE SURE TO READ NOTES in the addComfortable function before uncommenting.
//
// Add the number of days where the daily average low temp and average high temp fall
// within a comfortable range (I'm using 80-40).
// stationsObj = addComfortable(stationsObj);


// Remove all stations with incomplete information (all stations do not record all
// types of data).
for (let station in stationsObj) {
  if( stationsObj[station]["andSnGe1"] === "" ||
      stationsObj[station]["andSnCGe1"] === "" ||
      stationsObj[station]["andPrGe5Ti"] === "" ||
      stationsObj[station]["mTmxAv"].length === 0 ||
      stationsObj[station]["mTmnAv"].length === 0 ||
      stationsObj[station]["andTmnLe32"] === "" ||
      stationsObj[station]["andTmxGe60"] === "" ||
      stationsObj[station]["andTmxGe80"] === "") {
        delete stationsObj[station];
  }
};


// Find the state for each station and add it to stationsObj. Currently 2 letter
// abreviations are used, and some non-state US territories are included.
stationsObj = addStateNames(stationsObj);


// Deterine if a station lies within a larger metro or micropolitan area, and add
// that info if it does. Note that some stations belong to more than one area, in
// which case all areas will be added. Also, find if a station's metro/micro area
// also has other stations and make note of this.
stationsObj = addMetroMicro(stationsObj);


// Sort stationsObj alphabetically by city name (subsorted by state if a city names
// exists in multipl states). Station IDs remain the keys, but they will now be ordered
// based on their corresponding city name.
stationsObj = sortByCity(stationsObj);


// Many cities have more than one weather station. Find those cities and for them add
// an array with the values of all stations in that city.
stationsObj = createSharedCity(stationsObj);


// Below was something I wrote to see the number of citis with more than one station
// There's no need to print this out regularly, but I'm keeping around because
// I could see using again sometime.
//
// function nameCheck(xxx) {
//   let duplicates = {};
//   for (let station in xxx) {
//     if (xxx[station]["multiCity"].length > 0) {
//       let city = xxx[station]["city"];
//       let state = xxx[station]["state"];
//       let name = city + state;
//
//       if (duplicates[name]) {
//         duplicates[name]++;
//       } else {
//         duplicates[name] = 1;
//       }
//     }
//   }
//   return duplicates;
// }
//
// console.log(nameCheck(stationsObj));


// Build object that lists cities and stations in each metro area (see function for
// more info).
let metroMap = buildMetroCityList(stationsObj);


// Compute the min and max values for each weather observation being used. This will
// be used to set min/max values for input range sliders in the weather app.
let minMaxArray = createMinMax(stationsObj);


// Calculate the default station matches based off of the default weather values
// (found at minMaxArray[weatherValue][2]). This will be used to be used in the weather app.
// Return value is an object because it's easier to move around this way: {"defaultMatches": [matches array]}.
// BE SURE TO MANUALLY UPDATE WHEN NEW WEATHER VALUES ARE ADDED
let defaultMatches = findDefaultMatches(stationsObj, minMaxArray);



// OUTPUT INFORMATION:

// Turn stationsObj into JSON and output file.
const stationsObjJson = JSON.stringify(stationsObj);

fs.writeFile('weather.json', stationsObjJson, function(err) {
  if (err) {
    return console.error(err);
  };
});

// Turn minMaxArray into JSON and output file.
const minMaxArrayJson = JSON.stringify(minMaxArray);

fs.writeFile('minmax.json', minMaxArrayJson, function(err) {
  if (err) {
    return console.error(err);
  };
});

// Turn metroMap into JSON and output file.
const metroMapJson = JSON.stringify(metroMap);

fs.writeFile('metromap.json', metroMapJson, function(err) {
  if (err) {
    return console.error(err);
  };
});

// Turn defaultMatches into JSON and output file.
const defaultMatchesJson = JSON.stringify(defaultMatches);

fs.writeFile('defaultmatches.json', defaultMatchesJson, function(err) {
  if (err) {
    return console.error(err);
  };
});

// Export

// Output number of stations in modified stationsObj
console.log(Object.keys(stationsObj).length + " stations.");
console.log("Be sure to move move these 4 files over to the app:")
console.log("1. weather.json");
console.log("2. minmax.json");
console.log("3. metromap.json");
console.log("4. defaultmatches.json");
console.log("WARNING: If you have added any data to stationsObj you must manually adjust");
console.log("createminmax.js and defaultmatches.js to reflect the changes! Changes will");
console.log("also need to be made in the app to be able to use any new data.")
