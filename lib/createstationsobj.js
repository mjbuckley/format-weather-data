// Build stationsObj, which will be the object that contains all stations and their
// weather info. Basic form: stationsObj = { station1: {nested info}, station2: {nested info}, etc. }
// This sets up the basic structure. Weather info is added elsewhere.


const formatNoaaData = require('./formatnoaadata.js');


function createStationsObj(data) {

  // Take raw NOAA station data and turn into useable form.
  let formattedStationData = formatNoaaData(data);

  let stationsObj = {};

  // Loop through formatted data and populate stationsObj with basic info.
  for (let i of formattedStationData) {
    let cityName = "";
    // The formattedStationData array passed to this function has multiword city names broken up
    // into different elements. This rejoins the names back together.
    for (let j=2; j<i.length; j++) {
      if (j === 2) {
        cityName = cityName + i[j];
      } else {
        cityName = cityName + " " + i[j];
      }
    }
    const station = i[0];

    // Give basic format to each station object in stationsObj.
    stationsObj[station] = {
      zip: i[1],
      city: cityName,
      multiCity: [],
      area: [],
      sharedarea: [],
      state: "",
      andSnGe1: "",
      andSnCGe1: "",
      andPrGe5Ti: "",
      mTmxAv: [],
      mTmnAv: [],
      andTmnLe32: ""
    };
  }

  return stationsObj;
}

module.exports = createStationsObj;
