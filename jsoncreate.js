// Run this file from the command line to create weather.json, a file containing
// all of the JSON formatted NOAA data that will be used on the city-weather-app
// site. If weather.json already exists, it will be overwritten.


// NOTES:
// -For now I am ommiting the flags from weather.json because I'm not using
// them in the app. I can always add in the future.
// -Todo: Make stationsObj smaller by (1) making key names shorter, (2)
// removing stations not in the 50 states, and (3) perhaps not having things
// nested so much (like "precip", "snow", and "location" keys).
// -Todo: Output another file that contains the constants I need for the range
// slider inputs (min, max, etc.).


const fs = require('fs');
const createStationsObj = require('./lib/createstationsobj.js');
const fixDecimal = require('./lib/fixdecimal.js');
const fixDecimal13C = require('./lib/fixDecimal13c.js');
const fixSpecialValues = require('./lib/fixspecialvalues.js');
const fixSpecialValues13C = require('./lib/fixspecialvalues13c.js');
const formatNoaaData = require('./lib/formatnoaadata.js');
const separateFlags2C = require('./lib/separateflags2c.js');
const separateFlags13C = require('./lib/separateflags13c.js');


// Create stationsObj and build its initial structure. Built from NOAA's list of
// all station IDs and thier corresponding zipcodes and city names. Station IDs
// will be the keys of stationsObj, and the corresponding info will be stored as
// the value.
const stationData = fs.readFileSync('data/zipcodes-normals-stations.txt', 'utf8');
let stationsObj = formatNoaaData(stationData);
stationsObj = createStationsObj(stationsObj);


// Create formatted array of average numnber of days with at least an inch of
// snow.
const rawSnowData = fs.readFileSync('data/ann-snow-avgnds-ge010ti.txt', 'utf8');
let snowInfo = formatNoaaData(rawSnowData);
snowInfo = separateFlags2C(snowInfo);
snowInfo = fixSpecialValues(snowInfo);
snowInfo = fixDecimal(snowInfo);

// Add snowInfo data to stationsObj.
for (let i of snowInfo) {
  const station = i[0];
  const snowfall = i[1];
  if (stationsObj[station]) {
    stationsObj[station]["snow"]["annInchPlus"] = snowfall;
  }
};


// Create formatted array of average number of days with at least an inch of
// snow ground cover.
const snowGndData = fs.readFileSync('data/ann-snwd-avgnds-ge001wi.txt', 'utf8');
let snowGndInfo = formatNoaaData(snowGndData);
snowGndInfo = separateFlags2C(snowGndInfo);
snowGndInfo = fixSpecialValues(snowGndInfo);
snowGndInfo = fixDecimal(snowGndInfo);

// Add snow ground cover info to stationsObj.
for (let i of snowGndInfo) {
  const station = i[0];
  const snowdays = i[1];
  if (stationsObj[station]) {
    stationsObj[station]["snow"]["annGndInchPlus"] = snowdays;
  }
};


// Create formtted array of average number of days with at least .5 inch of
// precipitation.
const annRainData = fs.readFileSync('data/ann-prcp-avgnds-ge050hi.txt', 'utf8');
let annRainInfo = formatNoaaData(annRainData);
annRainInfo = separateFlags2C(annRainInfo);
annRainInfo = fixSpecialValues(annRainInfo);
annRainInfo = fixDecimal(annRainInfo);

// Add precip info to stationsObj.
for (let i of annRainInfo) {
  const station = i[0];
  const rainDays = i[1];
  if (stationsObj[station]) {
    stationsObj[station]["precip"]["annprcpge050hi"] = rainDays;
  }
};


// Create a formatted array of monthly average max temperature
const mlyTMaxData = fs.readFileSync('data/mly-tmax-normal.txt', 'utf8');
let mlyTMaxInfo = formatNoaaData(mlyTMaxData);
mlyTMaxInfo = separateFlags13C(mlyTMaxInfo);
mlyTMaxInfo = fixSpecialValues13C(mlyTMaxInfo);
mlyTMaxInfo = fixDecimal13C(mlyTMaxInfo);

// Add monthly tmax averages to stationsObj.
for (let i of mlyTMaxInfo) {
  const station = i[0];
  const tempArray = i[1];
  if (stationsObj[station]) {
    stationsObj[station]["temp"]["mlyTMaxAvg"] = tempArray;
  }
};


// Create a formatted array of monthly average max temperature
const mlyTMinData = fs.readFileSync('data/mly-tmin-normal.txt', 'utf8');
let mlyTMinInfo = formatNoaaData(mlyTMinData);
mlyTMinInfo = separateFlags13C(mlyTMinInfo);
mlyTMinInfo = fixSpecialValues13C(mlyTMinInfo);
mlyTMinInfo = fixDecimal13C(mlyTMinInfo);

// Add monthly tminaverages to stationsObj.
for (let i of mlyTMinInfo) {
  const station = i[0];
  const tempArray = i[1];
  if (stationsObj[station]) {
    stationsObj[station]["temp"]["mlyTMinInfo"] = tempArray;
  }
};


// Create formatted array of average numnber of days where the temp drops below
// freezing at some point.
const below32Data = fs.readFileSync('data/ann-tmin-avgnds-lsth032.txt', 'utf8');
let below32Info = formatNoaaData(below32Data);
below32Info = separateFlags2C(below32Info);
below32Info = fixSpecialValues(below32Info);
below32Info = fixDecimal(below32Info);

// Add below32Info data to stationsObj.
for (let i of below32Info) {
  const station = i[0];
  const below32 = i[1];
  if (stationsObj[station]) {
    stationsObj[station]["temp"]["daysBelow32"] = below32;
  }
};



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


// OUTPUT INFORMATION:

// Turn stationsObj into JSON and output file.
const stationsObjJson = JSON.stringify(stationsObj);

fs.writeFile('weather.json', stationsObjJson, function(err) {
  if (err) {
    return console.error(err);
  };
});

// Output number of stations in modified stationsObj
console.log(Object.keys(stationsObj).length + " complete stations.");
