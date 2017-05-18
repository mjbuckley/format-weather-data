// Create array of possible weather input options (calculated from input minmax). Return value is an object
// becaause it is easier to move around that way: {"weatheroptions": [option1, option2, etc]}.

function createWeatherOptions(inputMinMax) {

  let weatherOptions = Object.keys(inputMinMax);

  return {"weatherOptions": weatherOptions};
}

module.exports = createWeatherOptions;
