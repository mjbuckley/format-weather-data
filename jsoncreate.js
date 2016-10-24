// Run this file from the command line to create weather.json, a file containing
// all of the JSON formatted NOAA data that will be used on the city-weather-app
// site. If weather.json already exists, it will be overwritten.


// NOTES:
// -For now I am ommiting the flags from weather.json because I'm not using
// them in the app. I can always add in the future.
// -Todo: Make stationsObj smaller by (1) making key names shorter, (2)
// removing stations not in the 50 states, and (3) perhaps not having things
// nested so much (like "precip", "snow", and "location" keys).
// Improve naming and documentation. Some names are very confusing (ex: called
// ..Array when they are objects, etc.).
// -Why are the so many stations with incomplete data? 9000ish stations in zip
// table but only 4000ish with full info. Is there something I'm missing?

const addBelow32 = require('./lib/addBelow32.js');
const addMaxMin = require('./lib/addmaxmin.js');
const addMetroMicro = require('./lib/addmetromicro.js');
const addMlyTMax = require('./lib/addmlytmax.js');
const addMlyTMin = require('./lib/addmlytmin.js');
const addStateNames = require('./lib/addstatenames.js');
const createMinMax = require('./lib/createminmax.js');
const createStationsObj = require('./lib/createstationsobj.js');
const fixDecimal = require('./lib/fixdecimal.js');
const fixDecimal13C = require('./lib/fixDecimal13c.js');
const fixSpecialValues = require('./lib/fixspecialvalues.js');
const fixSpecialValues13C = require('./lib/fixspecialvalues13c.js');
const formatZctaData = require('./lib/formatzctadata.js');
const fs = require('fs');
const inchPlusSnow = require('./lib/inchplussnow.js');
const inchPlusSnowGnd = require('./lib/inchplussnowgnd.js');
const rainGdHalfIn = require('./lib/raingdhalfin.js');
const separateFlags2C = require('./lib/separateflags2c.js');
const separateFlags13C = require('./lib/separateflags13c.js');


// Create stationsObj and build its initial structure. Built from NOAA's list of
// all station IDs and thier corresponding zipcodes and city names. Station IDs
// will be the keys of stationsObj, and the corresponding info will be stored as
// the value.
const stationData = fs.readFileSync('data/zipcodes-normals-stations.txt', 'utf8');
let stationsObj = createStationsObj(stationData);


// Create formatted array of average numnber of days with at least an inch of
// snow.
const rawSnowData = fs.readFileSync('data/ann-snow-avgnds-ge010ti.txt', 'utf8');
stationsObj = inchPlusSnow(rawSnowData, stationsObj);


// Create formatted array of average number of days with at least an inch of
// snow ground cover.
const snowGndData = fs.readFileSync('data/ann-snwd-avgnds-ge001wi.txt', 'utf8');
stationsObj = inchPlusSnowGnd(snowGndData, stationsObj);


// Create formtted array of average number of days with at least .5 inch of
// precipitation.
const rainGdHalfInData = fs.readFileSync('data/ann-prcp-avgnds-ge050hi.txt', 'utf8');
stationsObj = rainGdHalfIn(rainGdHalfInData, stationsObj);


// Create a formatted array of monthly average max temperature
const mlyTMaxData = fs.readFileSync('data/mly-tmax-normal.txt', 'utf8');
stationsObj = addMlyTMax(mlyTMaxData, stationsObj);


// Create a formatted array of monthly average min temperature
const mlyTMinData = fs.readFileSync('data/mly-tmin-normal.txt', 'utf8');
stationsObj = addMlyTMin(mlyTMinData, stationsObj);


// Create formatted array of average numnber of days where the temp drops below
// freezing at some point.
const below32Data = fs.readFileSync('data/ann-tmin-avgnds-lsth032.txt', 'utf8');
stationsObj = addBelow32(below32Data, stationsObj);


// Remove all stations with incomplete information.
for(let obj in stationsObj) {
  if( stationsObj[obj]["snow"]["annInchPlus"] === "" ||
      stationsObj[obj]["snow"]["annGndInchPlus"] === "" ||
      stationsObj[obj]["precip"]["annprcpge050hi"] === "" ||
      stationsObj[obj]["temp"]["mlyTMaxAvg"].length === 0 ||
      stationsObj[obj]["temp"]["mlyTMinInfo"].length === 0 ||
      stationsObj[obj]["temp"]["daysBelow32"] === "" ) {
        delete stationsObj[obj];
  }
};


// Add states to stationsObj based off of zip codes
stationsObj = addStateNames(stationsObj);


// Add metro and micropolitan info to stations
stationsObj = addMetroMicro(stationsObj);


// Compute min and max values for use with input range slider.
let minMaxArray = createMinMax(stationsObj);


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

// Output number of stations in modified stationsObj
console.log(Object.keys(stationsObj).length + " stations.");
