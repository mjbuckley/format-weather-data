// Takes formatted 13 column monthly data and returns a new array:
// [[station, [1,2,3,etc.]], [station, [1,2,3,etc,]], etc.] where the second value
// is an array containing the weather data for each month with the flag stripped.

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
