function createSharedCity(stationsObj) {


  // Build an object of all names to find cities w/ multiple locations
  // {
  //   AlbanyNew York: [342323, 342342],
  //   BuffaloNew York: [345433],
  //   ColumbusOhio: [2343232, 23423432, 234324],
  //   etc.
  // }
  let cityDupes = {};

  for (let station in stationsObj) {
    let city = stationsObj[station]["city"];
    let state = stationsObj[station]["state"];
    let name = city + state;

    if (cityDupes[name]) {
      cityDupes[name].push(station);
    } else {
      cityDupes[name] = [station];
    }
  }

  // Add array of station names to stationsObj if a city has multiple locations.
  for (let station in stationsObj) {
    let city = stationsObj[station]["city"];
    let state = stationsObj[station]["state"];
    let name = city + state;

    if (cityDupes[name].length > 1) {
      stationsObj[station]["multiCity"] = cityDupes[name];
    }
  }

  return stationsObj;
}

module.exports = createSharedCity;
