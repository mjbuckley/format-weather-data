// Compute the min, max, midway, 1/3, and 2/3 values for each weather observation being used. This
// will be used to set min/max and default values for input range sliders in the weather app. Takes
// form of { andSnGe1: [0, 100, 50, 33, 67], etc. }. Note that I'm currently only using one of the
// 1/3-1/2-2/3 values for each weather value, but it's easier to just add all for now.


function createMinMax(obj) {
  // Array to hold all station values
  let valuesArray = {
    "andSnGe1": [],
    "andSnCGe1": [],
    "andPrGe5Ti": [],
    "mTmxAv": [],
    "mTmnAv": [],
    "andTmnLe32": [],
    "andTmxGe60": [],
    "andTmxGe80": []
  };

  // Adds every station value to its corresponding array in valuesArray
  for(let prop in obj) {
    valuesArray["andSnGe1"].push(obj[prop]["andSnGe1"]);
    valuesArray["andSnCGe1"].push(obj[prop]["andSnCGe1"]);
    valuesArray["andPrGe5Ti"].push(obj[prop]["andPrGe5Ti"]);
    valuesArray["mTmxAv"].push(obj[prop]["mTmxAv"][12]);
    valuesArray["mTmnAv"].push(obj[prop]["mTmnAv"][12]);
    valuesArray["andTmnLe32"].push(obj[prop]["andTmnLe32"]);
    valuesArray["andTmxGe60"].push(obj[prop]["andTmxGe60"]);
    valuesArray["andTmxGe80"].push(obj[prop]["andTmxGe80"]);
  };

  // Array to hold only lowest and highest values from all stations
  let minMaxArray = {
    "andSnGe1": [],
    "andSnCGe1": [],
    "andPrGe5Ti": [],
    "mTmxAv": [],
    "mTmnAv": [],
    "andTmnLe32": [],
    "andTmxGe60": [],
    "andTmxGe80": []
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

  // Find the middle value between the min and max (rounded to nearest integer)
  for (let arr in minMaxArray) {
    let middle = Math.round((minMaxArray[arr][0] + minMaxArray[arr][1]) / 2);
    minMaxArray[arr].push(middle);
  }

  // Find the 1/3 way point between the min and max (rounded to nearest integer)
  for (let arr in minMaxArray) {
    let oneThird = Math.round((minMaxArray[arr][0] + minMaxArray[arr][1]) / 3);
    minMaxArray[arr].push(oneThird);
  }

  // Find the 2/3 point between the min and max (rounded to nearest integer)
  for (let arr in minMaxArray) {
    let twoThirds = Math.round((minMaxArray[arr][0] + minMaxArray[arr][1]) / 1.5);
    minMaxArray[arr].push(twoThirds);
  }

  return minMaxArray;
}

module.exports = createMinMax;
