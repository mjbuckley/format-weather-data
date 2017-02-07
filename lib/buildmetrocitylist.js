// Create an object of metro areas and their cities, with each city containing
// an array of their stations. This will be useful for the metro areas page. Example:
// {
//   metroarea1: {
//     city1: [station1, station2],
//     city2: [station1, station2, station3],
//     city3: [station1]
//   },
//   metroarea2: {
//     city1: [station1, station2],
//     city2: [station1, station2, station3],
//     city3: [station1]
//   }
// }

// WORKS MOSTLY BUT keep in mind that I don't think it distinguishes between different
// metro areas of same name. NEED TO FIX THIS.

function metroCityList(stationsObj) {

  // Object to be build into above structure
  let metroMap = {};

  // Loop through each station
  Object.keys(stationsObj).forEach(function(station) {

    // Find if station has a metro area
    if (stationsObj[station]["area"].length > 0) {

      // Stations can have more than one metro area, so loop throuh all of them
      for (let i = 0; i < stationsObj[station]["area"].length; i++) {

        let place = stationsObj[station]["area"][i];
        if (metroMap[place]) {
          metroMap[place].push(station);
        } else {
          let stationArr = [station];
          metroMap[place] = stationArr;
        }
      }
    }
  });

  // At this point we have {"metroname, state(s)": [station, station], "metroname, state(s)": [station], etc.}
  // Now break each metro area up into cities.

  Object.keys(metroMap).forEach(function(metroArea) {
    let newObj = {};
    for (let i = 0; i < metroMap[metroArea].length; i++) {
      let station = metroMap[metroArea][i];
      let city = stationsObj[station]["city"];

      if (newObj[city]) {
        newObj[city].push(station);
      } else {
        let stationArr = [station];
        newObj[city] = stationArr;
      }
    }
    metroMap[metroArea] = newObj;
  })

  return metroMap;
}

module.exports = metroCityList;