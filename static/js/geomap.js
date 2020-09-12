
// ************************************************************************************************************************************************
// ************************************************************************************************************************************************
// *************************************************                                ***************************************************************
// *************************************************        GEOMAPPING PLOT         ***************************************************************
// *************************************************                                ***************************************************************
// ************************************************************************************************************************************************
// ************************************************************************************************************************************************

const clayChart = async() => {
  const data = await (await fetch("/top10")).json();
  // console.log(data);
  
  // here below this line is the code for Clay
  let latlong = [];
  let names_years = [];
  let name_year;
  let object = {};
  let hurdata = {};
  let windspeed = [];
  
  data.forEach((entry, index) => {
     name_year = `${entry.name}_${entry.year}`;
     if (names_years.indexOf(name_year) > -1) {
        var point = []
        hurdata = {}
        point.push(parseInt(entry.latitude))
        point.push(parseInt(entry.longitude))
        windspeed.push(parseInt(entry.max_wind))
        hurdata['Coordinates'] = latlong;
        hurdata['Wind Speed'] = windspeed;
        latlong.push(point)
        object[name_year] = hurdata;
     }
    //console.log(latlong);
     else {
        latlong = []
        windspeed = []
        hurdata = {}
        new_name_year = `${entry.name}_${entry.year}`;
        names_years.push(new_name_year);
     }
  })
  
  
      // Create an initial map object
      const myMap = L.map("geomap2").setView([25.07, -70.1], 4);
  
     //  // Add a tile layer to map
     //  const dark = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
     //    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
     //    id: "dark-v10",
     //    accessToken: API_KEY
     //  }).addTo(myMap);
  
     const light = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
        attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
        maxZoom: 18,
        id: "light-v10",
        accessToken: API_KEY
        }).addTo(myMap);
  
      // // *************** EXAMPLE MAPPING ABLE_1950 *****************
      var hurricane = object.Able_1950
      var line = hurricane.Coordinates
     //  console.log(line)
  
      // // **********************************************************
  
      // Create a polyline using the line coordinates and pass in some initial options
      L.polyline(line, {
        color: "red"
      }).addTo(myMap);
  
  
  
  }
  
  clayChart();
  
  