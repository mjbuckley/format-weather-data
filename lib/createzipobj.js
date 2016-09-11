// Take formatted weather data and create zip obj.
function createZipObj(data) {
  let stationObj = {};
  for (let i of data) {
    let cityName = "";
    for (let j=2; j<i.length; j++) {
      if (j === 2) {
        cityName = cityName + i[j];
      } else {
        cityName = cityName + " " + i[j];
      }
    }
    const station = i[0];

    stationObj[station] = {
      location: {
        "zip": i[1],
        "city": cityName
      }
    };
  }

  return stationObj;
}

module.exports = createZipObj;
