// Function takes two params: (1) A formatted array of 13 column Noaa data in
// the form of: [ [station, [1,2,3]], [station, [1,2,3]], etc. ],
// and (2), an value of "min" or "max". It returns the same array but with the min or
// max added to the end of each station's array. Given the above example array and
// a value of "max", it would return:
// [ [station, [1,2,3,3]], [station, [1,2,3,3]], etc. ]. Useful when trying to
// find stations that don't regularly get above or below certain values.

function addMaxMin(array, value) {
  if (value === "max") {
    array = array.map(function(subarray) {
      subarray[1].push(Math.max(...subarray[1]));
      return subarray;
    });
  };
  if (value === "min") {
    array = array.map(function(subarray) {
      subarray[1].push(Math.min(...subarray[1]));
      return subarray;
    });
  };
  return array;
};

module.exports = addMaxMin;
