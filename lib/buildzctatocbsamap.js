const fs = require('fs');
const formatZctaCbsaData = require('./formatzctacbsadata.js');


// Map ZCTA zips to CBSA ID numbers. Map is slightly odd because some zip map to
// both a metro and micro area, and in a few rare cases a zip might map to two metro
// areas or two micro areas. Result is { zcta: [cbsa1, cbsa2], zcta: [cbsa1], etc. }.
function buildZctaToCbsaMap() {
  const rawZctaData = fs.readFileSync('data/zcta_cbsa_rel_10.txt', 'utf8');
  let zctaCbsaArray = formatZctaCbsaData(rawZctaData); // [ [zip, cbsa#, memi#], etc. ]

  let zctaCbsaMap = {};
  for (let arr of zctaCbsaArray) {
    let zip = arr[0];
    let cbsa = arr[1];
    if (zctaCbsaMap[zip]) {
      let mapArr = zctaCbsaMap[zip];
      if (mapArr.includes(cbsa)) {
        continue;
      } else {
        zctaCbsaMap[zip].push(cbsa);
      }
    } else {
      zctaCbsaMap[zip] = [cbsa]
    }
  }

return zctaCbsaMap;
}

module.exports = buildZctaToCbsaMap
