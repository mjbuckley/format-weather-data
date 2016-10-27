STATIONS OBJECT: Object with station IDs as the properties and their info as the values.

stationsObj = { station1: {nested info}, station2: {nested info}, etc. }


EXAMPLE STATION (data not real):

"VQW00011624": {
  "location": {
    "zip": "00840",
    "city": "Frederiksted",
    "area": [cbsa1, cbsa2] // Metro/micro area. Usually only one, but can be more than one.
    "state": "OH"
  },
  "snow": {
    "annInchPlus": "0.0",
    "annGndInchPlus": "0.0"
  },
  "precip": {
    "annprcpge050hi": "18.8"
  },
  "temp": { // max and min [0]-[11] are jan-dec values, [12] is the max/min of those values
    "mlyTMaxAvg": ["84.0","84.0","84.6","85.7","86.7","87.9","88.7","89.2","89.0","87.8","86.3","84.7",89.2],
    "mlyTMinAvg": ["72.4","72.3","72.5","74.2","76.1","78.1","78.5","78.4","77.3","76.4","75.0","73.4",72.3],
    "daysBelow32": "0.0"
  }
}


MIN MAX ARRAY: Range of min and max possible values for each weather measurement. Min rounded down, max up.

{
  "annInchPlus":[0,93],
  "annGndInchPlus":[0,247],
  "annprcpge050hi":[0,135],
  "mlyTMaxAvg":[46,117],
  "mlyTMinAvg":[-27,73],
  "daysBelow32":[0,308]
}


Sources:

-State ID to state name: http://www2.census.gov/geo/docs/reference/state.txt
-CBSA data: http://www.census.gov/population/metro/files/lists/2015/List1.xls
-HUD zip code (not zcta) to zip map. File is ZIP_CBSA_092016.xlsx. Found at:https://www.huduser.gov/portal/datasets/usps_crosswalk.html



TO DO:
-THERE IS A PROBLEM WITH THE CBSA MAP IN THAT THERE ARE SOME CBSA CODES THAT SEEM TO BE REAL(ACCORDING TO
THE ZCTA TO CBSA DATA) BUT WHICH ARE MISSING FROM THE CBSA-DATA FILE. FIGURE THIS OUT.
-I've removed unused code, but there is still some unused data around (copy to archive if relevant).
-Make sure I have all my sources documented.
-There are some stations that are weird, with conflicting location info. These sometimes have
non existant zips like 000xx. Often in parks, etc. I saw a fish hatchery, etc. Figure out how to deal with.
-I have some archived files that I'm no longer using that mapped zcta zip data to stations. I have since found
a better way to do what I was trying to do, but one of the things it did was identify weird zips and send
a message to the console. I might repurpose this to find the weird zips I mentioned above.
-What to do with stations outside the 50 states.
-Figure out what to do with problems/send console message. Be sure that I clear message gets sent if there
could be a problem or something missing (with a not to manually resolve), and be sure to make it clear where
to manually resolve things (I don't have to build that process, just make clear how it would be handled).
-Make some sort of centralized location of values that I can pull from (such as all weather items
being used). That way I can just add changes and pull from there and not need to remember to change/add
values in every place that they are used.
-Better understand path usage for require and fs.readFileSync. I have things working, I'm not sure I fully get
how things work. Also, the way node works it checks multiple places in a certain order, so I might actually
be doing things wrong but getting it to work accidentally.
-Look in to ways to make stationsObj smaller.
-Improve naming and documentation. Some names are very confusing (ex: called somethingArray when it is
actually an object, etc.).


NOTES:
-For now I am omitting the flags from weather.json because I'm not using them in the app. I can always add
in the future.
