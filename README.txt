TO DO:
0) There are some stations that are weird, with conflicting location info. These sometimes have
non existant zips like 000xx. Often in parks, etc. Figure out how to deal with.
0.5) What to do with stations outside the 50 states.
1) TO FIX: (I think this is wrong, but I still need to better understand path useage here).
I thought that the path when using require('file') was relative to the file where
require was used, but I think it is really from where it is being run from. So, assuming
I'm always running from the project root, then some of my requires should be different (in
some cases they may still work right now based on how node tries to find things, but I shouldn't
rely on that working). Also, verify this new understanding is correct.

2) figure out what to do with problems/send console message

3) Integrate zip info into weather.json build

4) make some sort of centralized location of values that I can pull from (such as all weather items
being used). That way I can just add changes and pull from there and not need to remember to cheange/add
values in every place that they are used.




stationsObj = { station1: {nested info}, station2: {nested info}, etc. }


Example Station:

"VQW00011624": {
  "location": {
    "zip": "00840",
    "city": "Frederiksted",
    "state": ""
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

-State ID to state name: http://www2.census.gov/geo/docs/reference/state.txt
-CBSA data: http://www.census.gov/population/metro/files/lists/2015/List1.xls

A note on problem zips. I create a list of problem zips that map to two states, and I then
check to see if any station zip matches a problem zip. The weather.json build will still
work if there are any problems with the station zips, but there will be a warning (with station info).
However, in practice, none of the station zips match a problem zip. This will never change unless I start
using new data. So, I'm hesitant to build a manual resolution process for something I'll probably never
need. Just keep in mind that I'll need to add that if I ever change data and get stations with problem zips.
