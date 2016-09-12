// Takes formatted 13 column monthly data and returns a new array:
// [[station, [1,2,3, etc.]], [station, [1,2,3,etc,]], etc.] where each numner
// is the weather data for that month with the flag stripped from the values.
// Sort of does 2 things (flag strip and array building). Should be 2 functions?
function separateFlags13C(data) {
  data = data.map(function(array) {
    const station = array[0];
    let temps = [];
    for (let i=1; i < array.length; i++) {
      let temp = array[i];
      let lastChar = temp.charAt(temp.length - 1);
      if (lastChar == "C" || "S" || "R" || "P" || "Q") {
        temp = temp.replace(/P|S|R|Q|C/gi, "");
      };
      temps.push(temp);
    };

    let newArray = [station, temps];
    return newArray;
  });
  return data;
};

module.exports = separateFlags13C;
