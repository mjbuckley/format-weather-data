const fs = require('fs');
const formatHudCsv = require('./formathudcsv.js');

// Map ZCTA zips to CBSA ID numbers. Map is slightly odd because some zip map to
// both a metro and micro area, and in a few rare cases a zip might map to two metro
// areas or two micro areas. Result is { zcta: [cbsa1, cbsa2], zcta: [cbsa1], etc. }.
function buildZipToCbsaMap() {

  let fourFix = {
    "14454": 14460,
    "15764": 14460,
    "40484": 14460,
    "16974": 16980,
    "20994": 16980,
    "23844": 16980,
    "29404": 16980,
    "19124": 19100,
    "23104": 19100,
    "19804": 19820,
    "47664": 19820,
    "11244": 31080,
    "31084": 31080,
    "22744": 33100,
    "33124": 33100,
    "48424": 33100,
    "20524": 35620,
    "35004": 35620,
    "35084": 35620,
    "35614": 35620,
    "15804": 37980,
    "33874": 37980,
    "37964": 37980,
    "48864": 37980,
    "36084": 41860,
    "41884": 41860,
    "42034": 41860,
    "42644": 42660,
    "45104": 42660,
    "43524": 47900,
    "47894": 47900
  };



  const rawZipToCbsaData = fs.readFileSync('data/hudziptocbsa.csv', 'utf8');
  let zipToCbsaArray = formatHudCsv(rawZipToCbsaData); // [ [zip, cbsa#], etc. ]


  let zipToCbsaMap = {};
  for (let arr of zipToCbsaArray) {
    let zip = arr[0];
    let cbsa = arr[1];
    let cbsa2 = parseInt(cbsa, 10);

    // Fix ....4 cbsa codes.
    if (fourFix[cbsa2]) {
      cbsa2 = fourFix[cbsa2];
    }




    if (parseInt(cbsa2, 10) === 99999) { // 9999 means no cbsa associated with that zip
      continue;
    } else if (zipToCbsaMap[zip]) {

      let mapArr = zipToCbsaMap[zip];
      if (mapArr.includes(cbsa2)) {
        continue;
      } else {
        zipToCbsaMap[zip].push(cbsa2);
      }
    } else {
      zipToCbsaMap[zip] = [cbsa2];
    }
  }

return zipToCbsaMap;
}

module.exports = buildZipToCbsaMap;
