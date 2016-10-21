const fs = require('fs');
const formatZctaData = require('./lib/formatzctadata.js');
const mapNumToState = require('./lib/mapnumtostate.js');
const findProblemStationZips = require('./lib/findproblemstationzips.js');
const buildStateZipMap = require('./lib/buildstatezipmap.js');

const stationsObj = require('./weather.json'); // ultimately don't do this. just have for debuggin for now.


// Mapping zip codes to states is difficult (perhaps impossible), but the US Census
// Bureau Zip Code Tabulation Area data seems to be the best way I can relatively
// easily aproximate a mapping.

// Take Census Bureau ZCTA raw data and transform into an array with each element
// cosisting of an array of a zip and its state number. Ex: [ [12345, 14], [12567, 14], etc.]
const zipData = fs.readFileSync('data/zcta_place_rel_10.txt', 'utf8');
let zipArray = formatZctaData(zipData);


// Filter out problem zips that map to two states, remove duplicates, and build an object
// mapping zips to state: { 12345: 14, 12567: 14, etc. }.
let stateZipMap = buildStateZipMap(zipArray);
let zipObj = stateZipMap[0]; // zip to state map (minus problem zips)
let problems = stateZipMap[1]; // zips that map to two state


// Find out if any stations have a problem zip.
let problemStations = findProblemStationZips(problems, stationsObj);
// Need to do something if they exist.

// Change the state numbners in zipObj to state names
zipObj = mapNumToState(zipObj);
