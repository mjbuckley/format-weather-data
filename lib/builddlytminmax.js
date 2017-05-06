// I decided not to use this data, but am keeping this function areound in case
// I change my mind.

const formatDlyTMinMax= require('./formatdlytminmax.js');

// Take NOAA ASCII data for daily average high and lows and build in to a useable object.
// NOTE that I leave in special values like -8888. Based on how I'm using this isn't a
// problem, but be aware of this if ever used differently. Also, note that all months have 31
// days/entries. Non existent days are just given a -8888 value.
function buildDlyTMinMax(data) {

  // Break daily averages data up into a usable form. Results in:
  // [ [stationid, month (01-12), weathervalue(days 1-31)], etc. ]
  let formattedInfo = formatDlyTMinMax(data);

  // Remove flags
  let flaglessInfo = formattedInfo.map(function(array) {

    // Remove leading 0 on months "01" - "09" by converting to number.
    const month = Number(array[1]);

    // Create new array that will contain fixed info
    let newArray = [array[0], month];

    // start at index 2 to skip stationid and month number. All months have 31
    // entries (days with fewer than 31 days have value of -8888).
    for (let i=2; i<=32; i++) {

      let tValue = array[i];
      let lastChar = tValue.charAt(tValue.length - 1);

      // Remove flag if it's there
      if (lastChar == "C" || "S" || "R" || "P" || "Q") {
        tValue = tValue.replace(/P|S|R|Q|C/gi, "");
      }

      // Now add decimal (values here are in tenth of a degree, so add decimal before last numnber).
      tValue = tValue.slice(0, -1) + "." + tValue.slice(-1);

      // Convert tValue to a number
      tValue = Number(tValue);

      newArray.push(tValue);
    }

    return newArray
  });


  // At this point values are fixed. Now build object from data in this form:
  //  { stationid1: { '1': [tValues 1-31], ..., '12': [tValues 1-31] }, etc. }

  let tObj = {};

  flaglessInfo.forEach(function(array) {
    let station = array[0];
    let month = array[1];
    let tValue = array.slice(2); // Array of the 31 weather values for that month

    // // Months are numbered 01-12. Remove leading zeros.
    // if (month.charAt(0) === "0") {
    //   month = month.slice(1);
    // }

    if (tObj[station]) {
      tObj[station][month] = tValue;

    } else {
      tObj[station] = {};
      tObj[station][month] = tValue;
    }
  });

  return tObj;
}

module.exports = buildDlyTMinMax;
