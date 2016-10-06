// NOAA weather data is often reported in tenths of a unit. So a vlaue of
// 10 days is really 10 tenths, or 1 day.  This adds a decimal point to the values.
// This function is for formatted 13 column NOAA data with flags removed.
// NOTE: most but not all NOAA data is in tenths.  Check each data set before applying.

function fixDecimal13C(data) {
  // if length === 1, add 0. to beginning, else add . to length-1.
  data = data.map(function(array) {
    for (let i = 0; i < array[1].length; i++) {
      let value = array[1][i];
      let length = value.length;
      if (length === 1) {
        array[1][i] = "0." + value;
      } else {
        array[1][i] = value.slice(0, -1) + "." + value.slice(-1);
      };
    }
    return array;
  });
  return data;
};

module.exports = fixDecimal13C;
