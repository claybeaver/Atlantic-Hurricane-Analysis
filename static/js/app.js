
// ************************************************************************************************************************************************
// ************************************************************************************************************************************************
// *************************************************                                    ***********************************************************
// *************************************************       VARIABLE SCATTERPLOT         ***********************************************************
// *************************************************                                    ***********************************************************
// ************************************************************************************************************************************************
// ************************************************************************************************************************************************




const neilChart = async() => {
  // here below this line is the code for Neil
const data = await (await fetch("/costwind")).json();
var costwinds = []
var hurricanes = data.map(hurricane => hurricane.name_year)
data.forEach(hurricane => {
  var windspeed = 0;
  var cost = 0;
  var costwind = {}


  windspeed = hurricane.max_wind
  cost = hurricane.norm_damage_usd
  costwind['x'] = cost
  costwind['y'] = windspeed

  costwinds.push(costwind)

  
})


// console.log(costwinds);
var ctx = document.getElementById('myChart').getContext('2d');
var scatterChart = new Chart(ctx, {
   type: 'scatter',
   data: {
      labels: hurricanes,
      datasets: [{
         label: 'Hurricane',
         data: costwinds
      }]
   },
   options: {
      scales: {
         xAxes: [{
            scaleLabel: {
               display: true,
               labelString: 'Damage Cost in USD (Billions)'
            }
         }],
         yAxes: [{
            scaleLabel: {
               display: true,
               labelString: 'Maximum Wind Speed (MPH)'
            }
         }]
      },
      tooltips: {
         callbacks: {
            label: function(tooltipItem, data) {
               var label = data.labels[tooltipItem.index];
               return label + ': (' + tooltipItem.xLabel + ' Billion USD, ' + tooltipItem.yLabel + ' MPH)';
            }
         }
      }
   }
});

}
neilChart();

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
console.log(object)

    // Create an initial map object
    const myMap = L.map("geomap").setView([25.07, -70.1], 4);

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
    var hurricane = object
    var line = hurricane.Coordinates
   //  console.log(line)

    // // **********************************************************

    // Create a polyline using the line coordinates and pass in some initial options
    L.polyline(line, {
      color: "red"
    }).addTo(myMap);



}

clayChart();



// ************************************************************************************************************************************************
// ************************************************************************************************************************************************
// *************************************************                                ***************************************************************
// *************************************************        CHOROPLETH MAP          ***************************************************************
// *************************************************                                ***************************************************************
// ************************************************************************************************************************************************
// ************************************************************************************************************************************************



const amyChart = async() => {
const data = await (await fetch("/cost_by_state")).json();
// console.log(data);



// here below this line is the code for Amy
var states = data.map(entry => entry.name)
var costs = data.map(entry => parseInt(entry.total_damage))
// console.log(states)
// console.log(costs)

var chartData = [{
  type: 'choropleth',
  locationmode: 'USA-states',
  locations: states,
  z: costs,
  text: states,
  zmin: 0,
  zmax: 100000,
  colorscale: [
      [0, 'rgb(154, 200, 158)'], [0.2, 'rgb(188,189,220)'],
      [0.4, 'rgb(158,154,200)'], [0.6, 'rgb(84,39,143)'],
      [0.8, 'rgb(84,39,143)'], [1, 'rgb(234,60,83)']
      // [0.8, 'rgb(118,82,165)'], [1, 'rgb(84,39,143)']
  ],
  colorbar: {
      title: 'Millions USD',
      thickness: 20
  },
  marker: {
      line:{
          color: 'rgb(255,255,255)',
          width: 2
      }
  }
}];


var layout = {
  title: 'Cumulative Normalized Hurricane Damages',
  geo:{
      scope: 'usa',
      showlakes: true,
      lakecolor: 'rgb(255,255,255)'
  }
};

Plotly.newPlot("costmap", chartData, layout, {showLink: false});
}


amyChart();


// ************************************************************************************************************************************************
// ************************************************************************************************************************************************
// *************************************************                                    ***********************************************************
// *************************************************            TOP 10 GEOMAP           ***********************************************************
// *************************************************                                    ***********************************************************
// ************************************************************************************************************************************************
// ************************************************************************************************************************************************

const top10 = async() => {
   // here below this line is the code for Neil
   const data = await (await fetch("/top10")).json();
   console.log(data);
   var lat_lon = data.map(entry => entry.lat_lon);
   var name = data.map(entry => entry.name);
   var name_year = data.map(entry => entry.name_year);
   var hurricane_id = data.map(entry => parseInt(entry.hurricane_id));
   var max_wind = data.map(entry => parseInt(entry.max_wind));
   var air_pressure = data.map(entry => parseInt(entry.air_pressure));
   var time = data.map(entry => parseInt(entry.time));
   var lat_lon = data.map(entry => entry.lat_lon);
   var norm_damage_usd = data.map(entry => entry.norm_damage_usd);
   var damage_usd = data.map(entry => entry.damage_usd);
   
   // console.log(damage_usd);

   // var costs = data.map(entry => parseInt(entry.total_damage))


   
   // Create an initial map object
   const myTop10Map = L.map("top10").setView([25.07, -70.1], 4);

   //  // Add a tile layer to map
   //  const dark = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
   //    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
   //    id: "dark-v10",
   //    accessToken: API_KEY
   //  }).addTo(myMap);

   const light = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
      maxZoom: 18,
      id: "light-v10",
      accessToken: API_KEY
      }).addTo(myTop10Map);


    // // *************** EXAMPLE MAPPING ABLE_1950 *****************
   //  var hurricane = object.Able_1950
   //  var line = hurricane.Coordinates
   //  console.log(line)

    // // **********************************************************

    // Create a polyline using the line coordinates and pass in some initial options
   //  L.polyline(line, {
   //    color: "red"
   //  }).addTo(myMap);

}

top10();

// ************************************************************************************************************************************************
// ************************************************************************************************************************************************
// *************************************************                                ***************************************************************
// *************************************************       **** OLD CODE ****       ***************************************************************
// *************************************************                                ***************************************************************
// ************************************************************************************************************************************************
// ************************************************************************************************************************************************


// function mapHurricane(sample) {

//   const url = "/jsondata";
//   d3.json(url).then(function (data) {
//     // console.log(data);

//     let latlong = [];
//     let names_years = ['Able_1950'];
//     let name_year;
//     let object = {};

//     data.forEach((entry, index) => {
//       name_year = `${entry.name}_${entry.year}`;
//       if (names_years.indexOf(name_year) > -1) {
//         var point = []
//         point.push(parseInt(entry.latitude))
//         point.push(parseInt(entry.longitude))
//         object[name_year]
//         latlong.push([point])
//         object[name_year] = latlong;
//       }
//       //console.log(latlong);
//       else {
//         latlong = []
//         new_name_year = `${entry.name}_${entry.year}`;
//         names_years.push(new_name_year);
//       }
//     })

//     // console.log(object);

//     // // ******** OLD CODE FOR CONCAT LAT/LON *********
//     // var coordinates = []
//     // for (var i = 0; i < latitudes.length; i++) {
//     //   coordinates[i] = [latitudes[i], longitudes[i]];
//     // }
//     // // **********************************************
//     // console.log(latitudes);
//     // console.log(longitudes);
//     // console.log(coordinates);
//     // console.log(hurricaneName);
//     // console.log(names_years);

//     // Create an initial map object
//     const myMap = L.map("map").setView([25.07, -70.1], 4);

//     // Add a tile layer to map
//     L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
//       attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
//       tileSize: 512,
//       maxZoom: 18,
//       zoomOffset: -1,
//       id: "mapbox/streets-v11",
//       accessToken: API_KEY
//     }).addTo(myMap);

//     // // *************** EXAMPLE MAPPING ABLE_1950 *****************
//     // const ableLine = [
//     //   [17.02, -55.08],
//     //   [17.12, -56.05],
//     //   [18.03, -57.07],
//     //   [19, -58.1],
//     //   [20, -60],
//     //   [20.12, -61.02],
//     //   [21.05, -62.03],
//     //   [22, -63.03],
//     //   [22.12, -63.13],
//     //   [23.02, -64.1],
//     //   [23.07, -65.07],
//     //   [23.15, -66],
//     //   [24.07, -66.03],
//     //   [24.13, -66.08],
//     //   [25.03, -66.13],
//     //   [25.08, -67.08],
//     //   [25.12, -68.02],
//     //   [25.12, -68.12],
//     //   [25.08, -69.05],
//     //   [25.07, -69.13],
//     //   [25.07, -70.1],
//     //   [25.07, -71.08],
//     //   [25.08, -72.1],
//     //   [25.15, -73.05],
//     //   [26.12, -73.15],
//     //   [27.05, -74.07],
//     //   [27.15, -74.15],
//     //   [28.07, -75.05],
//     //   [29.02, -75.08],
//     //   [29.15, -75.08],
//     //   [30.12, -75.08],
//     //   [31.12, -75.08],
//     //   [32.13, -75.03],
//     //   [34.07, -74.05],
//     //   [36, -72.12],
//     //   [37.1, -71],
//     //   [39.05, -69.07],
//     //   [41.03, -67.05],
//     //   [43.05, -65],
//     //   [44.1, -63.12],
//     //   [45.08, -62.1],
//     //   [47.15, -59.13],
//     //   [50, -56.13],
//     //   [52, -53.13],
//     //   [53.1, -50.12],
//     //   [54.12, -47.12],
//     //   [55.05, -44.13],
//     //   [55.05, -41.13],
//     //   [54.08, -37.12],
//     //   [53.08, -33.12],
//     //   [52.08, -30.05]
//     // ];
//     // // **********************************************************

//     // Create a polyline using the line coordinates and pass in some initial options
//     // L.polyline(coordinates, {
//     //   color: "red"
//     // }).addTo(myMap);

//   })
// }

// mapHurricane();



// function buildGraph(sample) {
//   const url = "/maxwinds";
//   d3.json(url).then(function (data) {
//     console.log(data);
//     const names = data.map(entry => entry.name_year);
//     const maxwind = data.map(entry => entry.max_wind);
//     // console.log(names);
//     // console.log(maxwind);    

//     const title = `Maximum winds`;
//     const trace = {
//       x: maxwind,
//       y: names,
//       type: 'bar',
//       orientation: 'h',
//       title: title,
//       text: maxwind,
//     };
//     var data = [trace];
//     var layout = {
//       title: {
//         text: title,
//         font: {
//           size: 12
//         },
//       },
//       font: {
//         size: 8,
//       },
//       xaxis: {
//         title: "Maximum winds"
//       },
//       // yaxis: maxwind,
//       width: 400,
//       margin: {
//         l: 100,
//         r: 10,
//         b: 100,
//         t: 100,
//         pad: 10
//       }
//     };
//     Plotly.newPlot("plot", data, layout);
//   })
// };

// buildGraph();

// function geoJsonMap() {
//   const url = "/cost_by_state";
//   // d3.json(url2).then(function(data){
//   // console.log(data);
//   // const myMap = L.map("geoJsonMap", {
//   //   center: [29.75, -95.36],
//   //   zoom: 4
//   // });
//   d3.json(url).then(function (data) {
//   //  console.log(data);

//     // Adding a tile layer (the background map image) to our map
//     // We use the addTo method to add objects to our map
//     // var mapboxAccessToken = API_KEY;

//     // var map = L.map('geoJsonMap').setView([37.8, -96], 4);

//     const map = L.map("geoJsonMap", {
//       center: [29.75, -95.36],
//       zoom: 13
//     });

//     L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
//       attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
//       maxZoom: 5,
//       tileSize: 512,
//       id: 'mapbox/streets-v11',
//       zoomOffset: -1,
//       accessToken: API_KEY
//     }).addTo(map);
//   })
// };

// CHART I



// const dataNeils = fetchedData("/jsondata");
// console.log(dataNeils);

// const geoDataClay = fetch("/jsondata").then(response => response.json()).then(geodata => console.log(geodata));


// function costwind(sample) {

//   const url = "/costwind";
//   d3.json(url).then(function (data) {

//     // console.log(data);

//     // let latlong = [];
//     // let names_years = ['Able_1950'];
//     // let name_year;
//     // let object = {};

//     // data.forEach((entry, index) => {
//     //   name_year = `${entry.name}_${entry.year}`;
//     //   if (names_years.indexOf(name_year) > -1) {
//     //     var point = []
//     //     point.push(parseInt(entry.latitude))
//     //     point.push(parseInt(entry.longitude))
//     //     object[name_year]
//     //     latlong.push([point])
//     //     object[name_year] = latlong;
//     //   }
//     //   //console.log(latlong);
//     //   else {
//     //     latlong = []
//     //     new_name_year = `${entry.name}_${entry.year}`;
//     //     names_years.push(new_name_year);
//     //   }
//     // })

//     // console.log(object);
//   }
//   )}

//   costwind();

// function buildLeaflet() {
//       // The first parameter are the coordinates of the center of the map
//       // The second parameter is the zoom level
//       var map2 = L.map('map').setView([29.712, -95.006], 8);
      
//       // {s}, {z}, {x} and {y} are placeholders for map tiles
//       // {x} and {y} are the x/y of where you are on the map
//       // {z} is the zoom level
//       // {s} is the subdomain of cartodb
//         var layer = L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
//         attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="http://cartodb.com/attributions">CartoDB</a>'
//       });
//       // Now add the layer onto the map
//       map2.addLayer(layer);
//   }

//   buildLeaflet();

// function buildCostMap() {
  
//   const map1 = L.map("myDiv", {
//     center: [25.07, -70.1],
//     zoom: 4
//   })

//   var mapboxAccessToken = API_KEY;
  
//   L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=' + mapboxAccessToken, {
//       id: 'mapbox/light-v9',
//       tileSize: 512,
//       zoomOffset: -1
//   }).addTo(map1);

//   L.geoJson(statesData).addTo(map1);

// }

// buildCostMap();
