STATIONS OBJECT: Object with station IDs as the properties and their info as the values.

stationsObj = { station1: {info}, station2: {info}, etc. }


EXAMPLE STATION (note that "area" is currently removed before build to minimize size but can easily be added back in):

"VQW00011624": {
    "zip": "00840",
    "city": "Frederiksted",
    "multiCity": [], // if the city has multiple stations then all stations in that city listed here
    "area": [cbsa1, cbsa2], // Metro/micro area. Usually only one, but can be more than one. Form is "metro name, state(s) name," to distinguish different metro areas with same name (ex. Columbus)
    "sharedarea": [cbsa1], // Metro/micro area that station is a part of that also contain at least one other station in another city
    "state": "OH",
    "andSnGe1": "0.0",
    "andSnCGe1": "0.0",
    "andPrGe5Ti": "18.8",
    "mTmxAv": ["84.0","84.0","84.6","85.7","86.7","87.9","88.7","89.2","89.0","87.8","86.3","84.7",89.2],
    "mTmnAv": ["72.4","72.3","72.5","74.2","76.1","78.1","78.5","78.4","77.3","76.4","75.0","73.4",72.3],
      // max and min [0]-[11] are jan-dec values, [12] is the max/min of those values
    "andTmnLe32": "0.0"
  }
}


MIN MAX ARRAY: Range of min and max possible values for each weather measurement. Min rounded down, max up.

{
  "andSnGe1":[0,93],
  "andSnCGe1":[0,247],
  "andPrGe5Ti":[0,135],
  "mTmxAv":[46,117],
  "mTmnAv":[-27,73],
  "andTmnLe32":[0,308]
}


Sources:

-State ID to state name: http://www2.census.gov/geo/docs/reference/state.txt
-CBSA data: http://www.census.gov/population/metro/files/lists/2015/List1.xls
-HUD zip code (not zcta) to zip map. File is ZIP_CBSA_092016.xlsx. Found at:https://www.huduser.gov/portal/datasets/usps_crosswalk.html
-https://www.whitehouse.gov/sites/default/files/omb/bulletins/2015/15-01.pdf for ....4 cbsa info
