// Take formatted weather zipcode data and create zip obj.
function createZipObj(data) {
  let stationObj = {};
  for (let i of data) {
    let cityName = "";
    // The data array passed to this function has multiword city names broken up
    // into different elements. This rejoins the names back together.
    for (let j=2; j<i.length; j++) {
      if (j === 2) {
        cityName = cityName + i[j];
      } else {
        cityName = cityName + " " + i[j];
      }
    }
    const station = i[0];

    // Give basic format to each station object in stationObj.
    stationObj[station] = {
      location: {
        "zip": i[1],
        "city": cityName
      },
      "snow": {
        "annInchPlus": "",
        "annGndInchPlus": ""
      },
      "precip": {
        "annprcpge050hi": ""
      },
      "temp": {
        "mlyTMaxAvg": [],
        "mlyTMinInfo": [],
        "daysBelow32": ""
      }
    };
  }

  return stationObj;
}

module.exports = createZipObj;
