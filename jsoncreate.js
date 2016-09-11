// Run this file to build stationObj, the object containing all of the JSON
// formatted NOAA data that will be used on the weather site.


const fs = require('fs');
const createZipObj = require('./lib/createzipobj.js');
const fixDecimal = require('./lib/fixdecimal.js');
const fixSpecialValues = require('./lib/fixspecialvalues.js');
const formatNoaaData = require('./lib/formatnoaadata.js');
const separateFlags2C = require('./lib/separateflags2c.js');


// Build initial structure of stationObj from NOAA's list of all station
// IDs and thier corresponding zipcodes and city names. Station IDs will be the
// keys of stationObj, and the corresponding info will be stored as the value.
const stationData = fs.readFileSync('data/zipcodes-normals-stations.txt', 'utf8');
let stationObj = formatNoaaData(stationData);
stationObj = createZipObj(stationObj)
;

// Create formatted array of annual snow info (average number of days with
// snowfall greater than an inch).
const snowData = fs.readFileSync('data/ann-snow-avgnds-ge010ti.txt', 'utf8');
let snowInfo = formatNoaaData(snowData);
snowInfo = separateFlags2C(snowInfo);
snowInfo = fixSpecialValues(snowInfo);
snowInfo = fixDecimal(snowInfo);


// Add snowInfo data to stationData object.  NOTE: There are a few stations in
// the snow data set not pressent in the zipcode dataset.  I'll add the
// stations and info, but will check for incomplete data at a later point.
for (let i of snowInfo) {
  const station = i[0];
  const snowfall = i[1];
  const flag = i[2];
  const snowObj = {
      "annInchPlus": snowfall,
      "annInchPlusFlag": flag
  };
  if (stationObj[station]) {
    stationObj[station]["snow"] = snowObj;
  } else {
    stationObj[station] = {
      snow: snowObj
    };
  };
};


// Add data of annual number days with snow ground cover of at least an inch to
// stationObj.  NOTE!!!: This worked, however I suspect that the days here are
// NOT in tenths of an inch.  Verify this and change below.  Also, is there a
// good way to separate out the for loop into a function?
const snowGndData = fs.readFileSync('data/ann-snwd-avgnds-ge001wi.txt', 'utf8');
let snowGndInfo = formatNoaaData(snowGndData);
snowGndInfo = separateFlags2C(snowGndInfo);
snowGndInfo = fixSpecialValues(snowGndInfo);
snowGndInfo = fixDecimal(snowGndInfo);

for (let i of snowGndInfo) {
  const station = i[0];
  const snowdays = i[1];
  const flag = i[2];
  const snowGndObj = {
    "annGndInchPlus": snowdays,
    "annGndInchPlusFlag": flag
  };
  if (stationObj[station]["snow"]) {
    stationObj[station]["snow"]["annGndInchPlus"] = snowdays;
    stationObj[station]["snow"]["annGndInchPlusFlag"] = flag;
  } else {
    // station exists but not previous snow info
    if (stationObj[station]) {
      stationObj[station]["snow"] = snowGndObj;
    // neither station nor snow info exist
    } else {
      stationObj[station] = {
        "snow": snowGndObj
      };
    };
  };
};





//
const annRainData = fs.readFileSync('data/ann-prcp-avgnds-ge050hi.txt', 'utf8');
let annRainInfo = formatNoaaData(annRainData);
annRainInfo = separateFlags2C(annRainInfo);
annRainInfo = fixSpecialValues(annRainInfo);
annRainInfo = fixDecimal(annRainInfo);

for (let i of annRainInfo) {
  const station = i[0];
  const rainDays = i[1];
  const flag = i[2];
  const rainDaysObj = {
    "annprcpge050hi": rainDays,
    "annprcpge050hiFlag": flag
  };
  if (stationObj[station]) {
    stationObj[station]["precip"] = rainDaysObj;
  } else {
    stationObj[station] = {
      "precip": rainDaysObj
    };
  };
};

// console.log(stationObj);

// Remove all stations with incomplete information, and remove all flag info
// (not currently being used).  NOTE: checking for undefined is bad in general
// because a key could have been given a value of undefined, but since I know
// and created the data it ok to use here. Could have used key in obj or
// hasOwnProperty.
for(let obj in stationObj) {
  if( stationObj[obj]["location"] === undefined ||
      stationObj[obj]["snow"] === undefined ||
      stationObj[obj]["snow"]["annInchPlus"] === undefined ||
      stationObj[obj]["snow"]["annGndInchPlus"] === undefined ||
      stationObj[obj]["precip"] === undefined ) {
        delete stationObj[obj];
  } else {
    delete stationObj[obj]["snow"]["annInchPlusFlag"];
    delete stationObj[obj]["snow"]["annGndInchPlusFlag"];
    delete stationObj[obj]["precip"]["annprcpge050hiFlag"];
  }
};


// Turn stationObj into JSON and output file.  NOTE: this is a pretty large
// file.  I should look at ways to make this smaller (such as removing flag
// flag values in production, shortening names, removing incomplete stations,
// etc.).  ALSO: Should I make this a .json file instead of a .js file?
const stationObjJson= JSON.stringify(stationObj);

fs.writeFile('weather.js', stationObjJson, function(err) {
  if (err) {
    return console.error(err);
  };
});

// Output number of stations in modified stationObj
console.log(Object.keys(stationObj).length);


// TODO: Can make stationObj smaller by (1) making key names shorter, (2)
// removing stations not in the 50 states, and (3) perhaps not having things
// nested so much (like "precip", "snow", and "location" keys).
