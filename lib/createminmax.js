// Compute min and max values for use with input range slider.


function createMinMax(obj) {
  // Array to hold all station values
  let valuesArray = {
    "annInchPlus": [],
    "annGndInchPlus": [],
    "annprcpge050hi": [],
    "mlyTMaxAvg": [],
    "mlyTMinInfo": [],
    "daysBelow32": []
  };

  // Adds every station value to its corresponding array in valuesArray
  for(let prop in obj) {
    valuesArray["annInchPlus"].push(obj[prop]["snow"]["annInchPlus"]);
    valuesArray["annGndInchPlus"].push(obj[prop]["snow"]["annGndInchPlus"]);
    valuesArray["annprcpge050hi"].push(obj[prop]["precip"]["annprcpge050hi"]);
    valuesArray["mlyTMaxAvg"].push(obj[prop]["temp"]["mlyTMaxAvg"][12]);
    valuesArray["mlyTMinInfo"].push(obj[prop]["temp"]["mlyTMinInfo"][12]);
    valuesArray["daysBelow32"].push(obj[prop]["temp"]["daysBelow32"]);
  };

  // Array to hold only lowest and highest values from all stations
  let minMaxArray = {
    "annInchPlus": [],
    "annGndInchPlus": [],
    "annprcpge050hi": [],
    "mlyTMaxAvg": [],
    "mlyTMinInfo": [],
    "daysBelow32": []
  };

  for (let obj in valuesArray) {
    let allValuesArray = valuesArray[obj];
    minMaxArray[obj].push(Math.min(...allValuesArray));
    minMaxArray[obj].push(Math.max(...allValuesArray));
  };

  // Round min values down and max values up.
  for (let arr in minMaxArray) {
    minMaxArray[arr][0] = Math.floor(minMaxArray[arr][0]);
    minMaxArray[arr][1] = Math.ceil(minMaxArray[arr][1]);
  };

  return minMaxArray;
}

module.exports = createMinMax;
