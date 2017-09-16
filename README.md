# Format Weather Data

The code in this Github repo is responsible for creating the data files used by the [City Weather Match](http://www.cityweathermatch.com) website. It takes raw weather and location data and transforms it into a more useable set of JSON files. It is a companion project to the [city-weather-match](https://github.com/mjbuckley/city-weather-match) Github repo, which contains the site code for [City Weather Match](http://www.cityweathermatch.com).


## How It Works

The jsocnreate.js file is responsible for organizing the raw data and outputting it in a usable format. When run from the command line, it will process the data in the data directory and output five JSON files to be used by City Weather Match. To generate the files, run the following command from the root of the format-weather-data directory:

```
node jsoncreate.js
```

If the files already exist, they will be overwritten with the results of the new build. A general description of the five created files is below. For a more detailed information on how these files are structured and used, see [datainfo.md](https://github.com/mjbuckley/city-weather-match/datainfo.md) on the City Weather Match Github repository.

- **weather.json:** All weather stations and their weather and location data.
- **metromap.json:** A mapping of metro areas to cities in each metro area, and then a mapping of those cities to the weather stations in each city (metro area -> (city1 -> (station1, station2), city2 -> (station3)), etc.).
- **weatheroptions.json:** The names of all of the weather values that will require user input.
- **inputminmax.json:** The min, max, and default values for each weather option.
- **defaultmatches.json:** The weather stations whose weather values fall within the range of all of the default values in inputminmax.json.


## Data Sources

The raw data is located in the data directory. The sources for those files are as follows:

- The weather data and weather station location info comes from The National Oceanic and Atmospheric Administration's (NOAA) [1981-2010 Climate Normals](https://www.ncdc.noaa.gov/data-access/land-based-station-data/land-based-datasets/climate-normals/1981-2010-normals-data).
- The mapping of stations to metro and micropolitan areas is a three part process involving the following data:
  - Info on mapping zip codes to Core Based Statistical Area (CBSA) ID numbers comes from the Department of Housing and Urban Development. That mapping can be generated [here](https://www.huduser.gov/portal/datasets/usps_crosswalk.html).
  - Additional info on handling unconventional CBSA numbers come from the Office of Management and Budget's [OMB BULLETIN NO. 15-01](https://obamawhitehouse.archives.gov/sites/default/files/omb/bulletins/2015/15-01.pdf).
  - Info on converting CBSA IDs to metro and micropolitan area names comes from the Census Bureau. An .xls file with the info can be downloaded [here](https://www2.census.gov/programs-surveys/metro-micro/geographies/reference-files/2015/delineation-files/list1.xls).


## Adding New Data

If you want to add new raw data to be processed, there are several steps that need to be followed. First, add the new data in jsoncreate.js. Then you must manually adjust createminmax.js, createinputminmax, and finddefaultmatches.js to reflect the changes. Next, add the name of the new data to the section in jsoncreate.js that checks for stations with incomplete information. Finally, assuming that the changes are being made to use with City Weather Match, changes will also need to be made to the code there. See the notes on adding new data in [datainfo.md](https://github.com/mjbuckley/city-weather-match/datainfo.md) on the City Weather Match Github repository for more info.
