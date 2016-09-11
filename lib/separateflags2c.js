// Takes formatted 2 column NOAA weather data and strips flag from value and
// then adds flag to array as a separate element.  If no flag pressent, then
// new element is given a value of "missing"
function separateFlags2C(data) {
  data = data.map(function(array) {
    let amount = array[1];
    let lastChar = amount.charAt(amount.length - 1);
    if (lastChar == "C" || "S" || "R" || "P" || "Q") {
      amount = amount.replace(/P|S|R|Q|C/gi, "");
      array[1] = amount;
      array[2] = lastChar;
    } else {
      array[2] = "missing";
    };
    return array;
  });
  return data;
};

module.exports = separateFlags2C;
