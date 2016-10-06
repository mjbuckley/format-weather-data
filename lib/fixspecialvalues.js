// Takes formatted NOAA weather data (where flag have been separated and values
// are in the [1] spot in the array) and deals with NOAA special values that are
// in that spot. Right now this is only fixes -7777 (changes it to 0) because I
// haven't come across any other special values being used, but they would be
// dealt with here if I do.

function fixSpecialValues(data) {
  data = data.map(function(array) {
    let amount = array[1];
    if (amount == "-7777") {
      array[1] = "0";
    } else {
      array[1] = amount;
    };
    return array;
  });
  return data;
};

module.exports = fixSpecialValues;
