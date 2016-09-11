const fs = require('fs');
const snowData = fs.readFileSync('snow_data.txt', 'utf8');
let snowDataArray = snowData.split('\n');


snowDataArray = snowDataArray.map(function(entry) {
  return entry.replace(/\s+/g, " ");
});


let snowDataArray2 = [];
for (let i of snowDataArray) {
  snowDataArray2.push(i.split(" "));
}

// Above results last element of array being an empty string.  Test for this
// (empty string is falsey), and then remove that elemtnt.
if ( !snowDataArray2[snowDataArray2.length - 1][0] ) {
  snowDataArray2.pop();
};

// seperate flags from values (but keep for future reference) and convert -7777
// to 0.  Stll need to deal with other negative values.
snowDataArray2 = snowDataArray2.map(function(array) {
  let snowValue = array[1];
  let lastChar = snowValue.charAt(snowValue.length - 1);
  if (lastChar == "C" || "S" || "R" || "P" || "Q") {
    snowValue = snowValue.replace(/P|S|R|Q|C/gi, "");
    array[2] = lastChar;
  } else {
    array[2] = "missing";
  };

  if (snowValue == "-7777") {
    array[1] = "0";
  } else {
    array[1] = snowValue;
  };
  return array;
});

// if length === 1, add 0. to beginning, else add . to length-1.
snowDataArray2 = snowDataArray2.map(function(array) {
  const snowValue = array[1];
  const length = snowValue.length;
  if (length === 1) {
    array[1] = "0." + snowValue;
  } else {
    array[1] = snowValue.slice(0, -1) + "." + snowValue.slice(-1);
  };
  return array;
});

console.log(snowDataArray2);
