// Sort stationsObj so that stations are ordered alphabetically by city name. This
// is somewhat complicated because city names are deeply nested and not the main object
// properties. Additionally, cities in different states can have the same name. Plan is
// to create a combined name for each station consisting of downcased city(with spaces removed)
// + downcased state + station ID. Ex: columbusohusw34929002. Then create a new Object
// where the new name is the key and the current station object ({usw34929002: info})
// is the value. Sort this new object alphabetically by object keys. Then rebuild
// stationsObj from that ordered object. Note: The station ID is added because there could
// be stations from the same city/state and I need unique keys. I don't think it matters that
// there are numbers in the station ID because it should be treated as a string, but if I Run
// into trouble check there. Also, note that in some places I've read that you cannot depend on
// the order of objects and for that you need to use the new map object. However, these two sources:
// http://stackoverflow.com/questions/5467129/sort-javascript-object-by-key/31102605#31102605
// http://www.2ality.com/2015/10/property-traversal-order-es6.html
// plus some other reading suggest that you actually can. If this runs in to any problems I think
// I should just switch to a map object, but I want to see how this works first.

function sortByCity(stationsObj) {
  let unsortedObj = {};
  for (let station in stationsObj) {
    let city = stationsObj[station]["location"]["city"];
    let state = stationsObj[station]["location"]["state"];
    let stationId = station;
    city = city.toLowerCase();
    city = city.replace(/ /g, ''); // Remove spaces
    state = state.toLowerCase();
    let newName = city + state + stationId; // Ex: columbusohUSW34929002
    let newStationValue = {};
    newStationValue[station] = stationsObj[station];
    unsortedObj[newName] = newStationValue;
  }
  // Ex: { columbusohusw34929002: { usw34929002: {info}}, newyorknyusw57929002: { usw57929002: {info}}, etc.}

  // Now sort the keys and rebuild the stationsObj
  let sortedObj = {};
  let sortedKeys = Object.keys(unsortedObj).sort(); // Ex: [columbusohusw34929002, newyorknyusw57929002, etc.]
  for (let i = 0; i < sortedKeys.length; i++) {
    let cityStateStation = sortedKeys[i]; // ex: columbusohusw34929002
    let fullStation = unsortedObj[cityStateStation]; // ex: { usw34929002: {info} }
    let preStationId = Object.keys(fullStation); // ex: [usw34929002]
    let stationId = preStationId[0]; // ex: usw34929002
    let stationInfo = unsortedObj[cityStateStation][stationId]; // Actual station info
    sortedObj[stationId] = stationInfo;
  }

  return sortedObj; // Same as stationsObj passed in but now sorted
}

module.exports = sortByCity;
