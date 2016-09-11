// NOAA weather data is often reported in tenths of a unit. So a vlaue of
// 10 for days is really 10 tenths, or 1 day.  This adds decimal point to
// values. NOTE: most but not all NOAA data is in tenths.  Check each data set.
function fixDecimal(data) {
  // if length === 1, add 0. to beginning, else add . to length-1.
  data = data.map(function(array) {
    const value = array[1];
    const length = value.length;
    if (length === 1) {
      array[1] = "0." + value;
    } else {
      array[1] = value.slice(0, -1) + "." + value.slice(-1);
    };
    return array;
  });
  return data;
};

module.exports = fixDecimal;
