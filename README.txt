Current example of one complete station entry

"RQC00666270": {
  "location": {
    "zip": "00674",
    "city": "Manati"
  },
  "snow": {
    "annInchPlus": "0.0",
    "annInchPlusFlag": "P",
    "annGndInchPlus": "0.0",
    "annGndInchPlusFlag": "P"
  },
  "precip": {
    "annprcpge050hi": "37.8",
    "annprcpge050hiFlag": "P"
  }
  "temp": {
    "mlyTMaxAvg": ["1", "2"... "12"] // where 1-12 are values for each month
  }
}

stationObj = { station1: {nested info}, station2: {nested info}, etc.}
