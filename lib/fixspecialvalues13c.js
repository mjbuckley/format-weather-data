// Takes formatted NOAA weather data (where flags have been separated and values
// are in the [1]-[12] locations in the array) and deals with NOAA special values
// that are in those spots. Right now this is only fixes -7777 (changes it to 0)
// because I haven't come across any other special values being used, but they
// can be delt with here if I ever come accross them being used.
function fixSpecialValues13C(data) {
  data = data.map(function(array) {
    for (let i = 0; i < array[1].length; i++) {
      if (array[1][i] == "-7777") {
        array[1][i] = "0";
      };
    }
    return array;
  });
  return data;
};

module.exports = fixSpecialValues13C;
