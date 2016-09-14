// Run this file from the command line to create weather.js, a file containing
// all of the JSON formatted NOAA data that will be used on the weather site.
// If weather.js already exists, it will be overwritten.

// TODO: Can make stationObj smaller by (1) making key names shorter, (2)
// removing stations not in the 50 states, and (3) perhaps not having things
// nested so much (like "precip", "snow", and "location" keys).
// Also, there is nothing incorrect about how I'm creating stationObj, but as
// it gets larger it has the potential to get confusing to follow. Look at ways
// to move chunks into separate functions, and consider creating the full obj
// right away (but with '' as values). Then I don't need to keep checking for
// stuff to exist. Perhaps something like a class where I can just call
// newStation() and have an object with all keys alrady pressent?


const fs = require('fs');
const createZipObj = require('./lib/createzipobj.js');
const fixDecimal = require('./lib/fixdecimal.js');
const fixSpecialValues = require('./lib/fixspecialvalues.js');
const formatNoaaData = require('./lib/formatnoaadata.js');
const separateFlags2C = require('./lib/separateflags2c.js');
const separateFlags13C = require('./lib/separateflags13c.js');
const fixSpecialValues13C = require('./lib/fixspecialvalues13c.js');
const fixDecimal13C = require('./lib/fixDecimal13c.js');


// Build initial structure of stationObj from NOAA's list of all station
// IDs and thier corresponding zipcodes and city names. Station IDs will be the
// keys of stationObj, and the corresponding info will be stored as the value.
const stationData = fs.readFileSync('data/zipcodes-normals-stations.txt', 'utf8');
let stationObj = formatNoaaData(stationData);
stationObj = createZipObj(stationObj);


// Create formatted array of average numnber of days with at least an inch of
// snow.
const snowData = fs.readFileSync('data/ann-snow-avgnds-ge010ti.txt', 'utf8');
let snowInfo = formatNoaaData(snowData);
snowInfo = separateFlags2C(snowInfo);
snowInfo = fixSpecialValues(snowInfo);
snowInfo = fixDecimal(snowInfo);

// Add snowInfo data to stationObj.  NOTE: There are a few stations in
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


// Create formatted array of average number of days with at least an inch of
// snow ground cover.
const snowGndData = fs.readFileSync('data/ann-snwd-avgnds-ge001wi.txt', 'utf8');
let snowGndInfo = formatNoaaData(snowGndData);
snowGndInfo = separateFlags2C(snowGndInfo);
snowGndInfo = fixSpecialValues(snowGndInfo);
snowGndInfo = fixDecimal(snowGndInfo);

// Add snow ground cover info to stationObj. Add station if not already pressent
// in stationObj.
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


// Create formtted array of average number of days with at least .5 inch of
// precipitation.
const annRainData = fs.readFileSync('data/ann-prcp-avgnds-ge050hi.txt', 'utf8');
let annRainInfo = formatNoaaData(annRainData);
annRainInfo = separateFlags2C(annRainInfo);
annRainInfo = fixSpecialValues(annRainInfo);
annRainInfo = fixDecimal(annRainInfo);

// Add precip info to stationObj. Add station to stationObj if not already
// pressent.
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


// Create a formatted array of monthly average max temperature
const mlyTMaxData = fs.readFileSync('data/mly-tmax-normal.txt', 'utf8');
let mlyTMaxInfo = formatNoaaData(mlyTMaxData);
mlyTMaxInfo = separateFlags13C(mlyTMaxInfo);
mlyTMaxInfo = fixSpecialValues13C(mlyTMaxInfo);
mlyTMaxInfo = fixDecimal13C(mlyTMaxInfo);

// Add monthly tmax averages to stationObj.
for (let i of mlyTMaxInfo) {
  const station = i[0];
  const tempArray = i[1];
  const tempObj = {
    "mlyTMaxAvg":tempArray
  };
  if (stationObj[station]) {
    stationObj[station]["temp"] = tempObj;
  } else {
    stationObj[station] = {
      "temp": tempObj
    };
  };
};


// Remove all stations with incomplete information, and remove all flag info.
// I'm removing because I don't want that data right now, but I added it in the
// first place because I could see wanting it in the future. NOTE: checking if
// a key valye is undefined is bad in general (because a key could have been
// given a value of undefined but still exist), but since I created the object
// myself I feel ok to use here. Could have used key in obj or hasOwnProperty.
for(let obj in stationObj) {
  if( stationObj[obj]["location"] === undefined ||
      stationObj[obj]["snow"] === undefined ||
      stationObj[obj]["snow"]["annInchPlus"] === undefined ||
      stationObj[obj]["snow"]["annGndInchPlus"] === undefined ||
      stationObj[obj]["precip"] === undefined ||
      stationObj[obj]["temp"] === undefined ) {
        delete stationObj[obj];
  } else {
    delete stationObj[obj]["snow"]["annInchPlusFlag"];
    delete stationObj[obj]["snow"]["annGndInchPlusFlag"];
    delete stationObj[obj]["precip"]["annprcpge050hiFlag"];
  }
};


// OUTPUT INFORMATION:

// Turn stationObj into JSON and output file. NOTE: this is a pretty large
// file. I should look at ways to make this smaller. ALSO: Should I make this a
// .json file instead of a .js file?
const stationObjJson= JSON.stringify(stationObj);

fs.writeFile('weather.json', stationObjJson, function(err) {
  if (err) {
    return console.error(err);
  };
});

// Output number of stations in modified stationObj
console.log(Object.keys(stationObj).length);
