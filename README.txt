stationsObj = { station1: {nested info}, station2: {nested info}, etc. }


Example Station:

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
    "mlyTMaxAvg": ["84.0","84.0","84.6","85.7","86.7","87.9","88.7","89.2","89.0","87.8","86.3","84.7",89.2],
    "mlyTMinInfo": ["72.4","72.3","72.5","74.2","76.1","78.1","78.5","78.4","77.3","76.4","75.0","73.4",72.3],
    "daysBelow32": "0.0"
  }
}


minMaxArray:

{
  "annInchPlus":[0,93],
  "annGndInchPlus":[0,247],
  "annprcpge050hi":[0,135],
  "mlyTMaxAvg":[46,117],
  "mlyTMinInfo":[-27,73],
  "daysBelow32":[0,308]
}


Sources:

State ID to state name: http://www2.census.gov/geo/docs/reference/state.txt
