const fs = require('fs');
const formatHudCsv = require('./formathudcsv.js');

// Map zip codes to CBSA ID numbers. Map is slightly odd because some zip map to
// both a metro and micro area, and in a few rare cases a zip might map to two metro
// areas or two micro areas. Result is something like: { zip: [cbsa1, cbsa2], zip: [cbsa1], etc. }.
function buildZipToCbsaMap() {

  // Grab the file with the zip to cbsa info and convert it to a usable format. This file is comes from the the
  // Housing and Urban Development Department's mapping of zipcodes to cbsa codes from the 3rd quarter of '16.
  // It was originally a much larger xlsx file with additional unneeded info, but I exported the needed info to
  // a csv file. The original file (ZIP_CBSA_092016.xlsx) an be generated at:
  // https://www.huduser.gov/portal/datasets/usps_crosswalk.html
  const rawZipToCbsaData = fs.readFileSync('data/hudziptocbsa.csv', 'utf8');
  let zipToCbsaArray = formatHudCsv(rawZipToCbsaData); // -> [ [zip, cbsa#], [zip, cbsa#], etc. ]


  // The HUD zip-cbsa data has a few unusual cbsa codes for cbsa sub areas within major metro areas. I've never,
  // found good documentation on this, and they are typically not included in the other cbsa lists that I
  // have found. I was able to find a pdf document at
  // https://www.whitehouse.gov/sites/default/files/omb/bulletins/2015/15-01.pdf (as of 8/17/17 now found at:
  // https://obamawhitehouse.archives.gov/sites/default/files/omb/bulletins/2015/15-01.pdf )
  // listing these sub areas, and the cbsafix.json file below is a manual mapping of the sub area codes
  // to their parent metro area (ex: 35084 Newark, NJ-PA Metropolitan Division gets mapped to the larger
  // NY area metro devision) Note: It appears that all the sub areas end in a 4, whereas regular areas end in 0.
  const cbsaFix = require('../data/cbsafix.json');


  // Create map of zip to cbsa.
  let zipToCbsaMap = {};
  for (let arr of zipToCbsaArray) {
    let zip = arr[0];
    let cbsa = arr[1];
    let cbsa2 = parseInt(cbsa, 10); // Not sure this is needed, but ensures type is num.


    // Replace sub area cbsa codes with parent area cbsa codes.
    if (cbsaFix[cbsa2]) {
      cbsa2 = cbsaFix[cbsa2];
    }

    // Don't add zips with cbsa of 99999 because 99999 means the zip doesn't belong to a cbsa
    if (parseInt(cbsa2, 10) === 99999) {
      continue;
    } else if (zipToCbsaMap[zip]) { // zip already pressent
      let mapArr = zipToCbsaMap[zip];
      if (mapArr.includes(cbsa2)) { // if cbsa in zip's cbsa array do nothing
        continue;
      } else { // if not in zip's cbsa array then add it
        zipToCbsaMap[zip].push(cbsa2);
      }
    } else { // zip not yet part of object. Add zip and the corrisponding cbsa
      zipToCbsaMap[zip] = [cbsa2];
    }
  }

return zipToCbsaMap;
}

module.exports = buildZipToCbsaMap;
