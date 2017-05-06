// I Decided not to use this data, but I'm keeping this function around in case I ever
// change my mind. IMPORTANT NOTES:
// 1) Because of their size, the files dly-tmax-normal.txt and dly-tmin-normal.txt have
// been removed and would need to be added back to the data directory.
// 2) Would need to add an "andComfort" key in createStationsObj.
// 3) Would need to check for stations that are missing andComfort values and remove them
// from stationsObj.

const buildDlyTMinMax = require('./builddlytminmax.js');
const fs = require('fs');

// Finds number of days that the avg low/high temp both fall within a specified comfortable
// range and then adds that number to stationsObj.
function addComfortable(stationsObj) {

  // Create objects with daily tmin/max daily averages. They take the form of:
  //  { stationid1: { '1': [tValues 1-31], ..., '12': [tValues 1-31] }, etc. }
  // Note that all months have 31 entries (non-existent days have -888.8 value).
  const dlyTmax = fs.readFileSync('data/dly-tmax-normal.txt', 'utf8');
  const dlyTMaxObj = buildDlyTMinMax(dlyTmax);

  const dlyTmin = fs.readFileSync('data/dly-tmin-normal.txt', 'utf8');
  const dlyTMinObj = buildDlyTMinMax(dlyTmin);


  // Now need to loop through stations, checking each day to see if the tmin/max values
  // are within range. If yes, add to a count. When done, add that count number in weather.json
  // as the entry for number of comfortable days for that station.
  Object.keys(stationsObj).forEach(function(station) {

    // only run loop if station is in min/max data set
    if (dlyTMaxObj[station] && dlyTMinObj[station]) {

      let count = 0;

      // Loop through months
      for (let i = 1; i<=12; i++) {

        // Loop through days
        for (let j = 0; j<=30; j++) {

          if (dlyTMaxObj[station][i][j] <= 80 && dlyTMinObj[station][i][j] >= 40) {
            count ++;
          }
        }
      }

      stationsObj[station]["andComfort"] = count;
    }
  });

  return stationsObj;
}

module.exports = addComfortable;
