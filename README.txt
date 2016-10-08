Current example of one complete station entry

"RQC00666270": {
  "location": {
    "zip": "00674",
    "city": "Manati"
  },
  "snow": {
    "annInchPlus": "0.0",
    "annGndInchPlus": "0.0",
  },
  "precip": {
    "annprcpge050hi": "37.8",
  },
  "temp": {
    "mlyTMaxAvg": ["1", "2"... "13"], // where [0]-[11] are values for each month and [12] is the max value
    "mlyTMinAvg": ["1", "2"... "13"], // where [0]-[11] are values for each month and [12] is the min value
    "daysBelow32": 91,
  }
}

stationsObj = { station1: {nested info}, station2: {nested info}, etc.}


Actual station example:

"VQW00011624": {
  "location": {
    "zip": "00840",
    "city": "Frederiksted"
  },
  "snow": {
    "annInchPlus": "0.0",
    "annGndInchPlus": "0.0"
  },
  "precip": {
    "annprcpge050hi": "18.8"
  },
  "temp": {
    "mlyTMaxAvg": ["84.0","84.0","84.6","85.7","86.7","87.9","88.7","89.2","89.0","87.8","86.3","84.7","89.2"],
    "mlyTMinInfo": ["72.4","72.3","72.5","74.2","76.1","78.1","78.5","78.4","77.3","76.4","75.0","73.4","72.3"],
    "daysBelow32": "0.0"
  }
}
