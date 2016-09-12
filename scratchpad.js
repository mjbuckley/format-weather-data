const fs = require('fs');
const formatNoaaData = require('./lib/formatnoaadata.js');


const mlyTMaxData = fs.readFileSync('data/mly-tmax-normal.txt', 'utf8');
let mlyTMaxInfo = formatNoaaData(mlyTMaxData);

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

mlyTMaxInfo = separateFlags13C(mlyTMaxInfo);


console.log(mlyTMaxInfo);
