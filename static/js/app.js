
// ************************************************************************************************************************************************
// ************************************************************************************************************************************************
// *************************************************                                    ***********************************************************
// *************************************************       VARIABLE SCATTERPLOT         ***********************************************************
// *************************************************                                    ***********************************************************
// ************************************************************************************************************************************************
// ************************************************************************************************************************************************

// const { read } = require("fs");




const neilChart = async() => {
   // here below this line is the code for Neil
 const datas = await (await fetch("/top10")).json();
 
 var hurricanes = datas.map(hurricane => hurricane.name_year)
 
 
 let names_years = ['Andrew_1992'];
 let name_year;
 let hurdata = {};
 let cost = 0;
 let windSpeeds = []
 let hurData2 = []
 var colors = ['rgba(0, 0, 0,.5)','rgba(75, 93, 156,.5)','rgba(255, 0, 0,.5)','rgba(0, 161, 0,.5)','rgba(0, 0, 255,.5)',
 'rgb(0, 165, 255,.5)','rgba(0, 255, 0,.5)','rgba(238, 130, 238,.5)','rgba(255, 165, 0,.5)','rgba(102, 102, 102,.5)']
 
 datas.forEach(entry => {
    name_year = entry.name_year
    if (names_years.indexOf(name_year) > -1) {
       cost = entry.damage_usd
       windSpeeds.push(parseInt(entry.max_wind))
       hurdata['y'] = d3.max(windSpeeds);
       hurdata['x'] = cost;
       hurdata['r'] = cost/2;
       
    }
 
    else {
       console.log(hurdata)
       hurData2.push(hurdata)
       cost = 0;
       windSpeeds = []
       hurdata = {}
       new_name_year = `${entry.name}_${entry.year}`;
       names_years.push(new_name_year);
    }
 
    
   
 })
 hurData2.push(hurdata)
 console.log(hurData2);

 
 var datasetz = []
 var dataset = {}
 console.log(names_years[0])
 console.log(colors[0])
 console.log(hurData2[0])
 for (var i=0; i<names_years.length; i++) {
    dataset = []
    dataset['label'] = names_years[i]
    dataset['backgroundColor'] = colors[i]
    dataset['borderColor'] = colors[i]
    dataset['data'] = [hurData2[i]]
    datasetz.push(dataset)
 }
 
 console.log(datasetz[0])
 console.log(names_years.length)
 console.log(hurData2[0])
 
 var ctx = document.getElementById('myChart').getContext('2d');
 var scatterChart = new Chart(ctx, {
    type: 'bubble',
    data: {
       labels: names_years,
       datasets: datasetz

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
                return  tooltipItem.xLabel + ' Billion USD, ' + tooltipItem.yLabel + ' MPH';
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


   const dark = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
      attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
      id: "dark-v10",
      accessToken: API_KEY
      });

   const light = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
      attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
      maxZoom: 18,
      id: "light-v10",
      accessToken: API_KEY
      });
   
   // Initialize all of the LayerGroups we'll be using
   const layers = {
      Hurricane_Andrew_1992: new L.LayerGroup(),
      Hurricane_Charley_2004: new L.LayerGroup(),
      Hurricane_Harvey_2017: new L.LayerGroup(),
      Hurricane_Ike_2008: new L.LayerGroup(),
      Hurricane_Irma_2017: new L.LayerGroup(),
      Hurricane_Ivan_2004: new L.LayerGroup(),
      Hurricane_Katrina_2005: new L.LayerGroup(),
      Hurricane_Rita_2005: new L.LayerGroup(),
      Hurricane_Sandy_2012: new L.LayerGroup(),
      Hurricane_Wilma_2005: new L.LayerGroup()
   };

   // Create an initial map object
   const myMap = L.map("geomap", {
      center: [30.73, -84.50],
      zoom: 4,
      layers: [
         layers.Hurricane_Andrew_1992,
         layers.Hurricane_Charley_2004,
         layers.Hurricane_Harvey_2017,
         layers.Hurricane_Ike_2008,
         layers.Hurricane_Irma_2017,
         layers.Hurricane_Ivan_2004,
         layers.Hurricane_Katrina_2005,
         layers.Hurricane_Rita_2005,
         layers.Hurricane_Sandy_2012,
         layers.Hurricane_Wilma_2005
      ]
   });

   // Create an overlays object to add to the layer control
   const overlays = {
      "Andrew_1992": layers.Hurricane_Andrew_1992,
      "Charley_2004": layers.Hurricane_Charley_2004,
      "Harvey_2017": layers.Hurricane_Harvey_2017,
      "Ike_2008": layers.Hurricane_Ike_2008,
      "Irma_2017": layers.Hurricane_Irma_2017,
      "Ivan_2004": layers.Hurricane_Ivan_2004,
      "Katrina_2005": layers.Hurricane_Katrina_2005,
      "Rita_2005": layers.Hurricane_Rita_2005,
      "Sandy_2012": layers.Hurricane_Sandy_2012,
      "Wilma_2005": layers.Hurricane_Wilma_2005
   };


   light.addTo(myMap)

   // Only one base layer can be shown at a time
   const baseMaps = {
      Light: light,
      Dark: dark
   };
   
   L.control.layers(baseMaps, overlays).addTo(myMap);

   let featureType;

   let latlong = [];
   let names_years = []; //[]
   let name_year;
   let object = {};
   // let hurdata = {};
   let windspeed = [];

   data.forEach((entry, index) => {

      name_year = `${entry.name}_${entry.year}`;
      
      if (names_years.indexOf(name_year) > -1) {
         var point = []
         hurdata = {}
         latitude = parseInt(entry.latitude);
         longitude = parseInt(entry.longitude);
         point.push(latitude);
         point.push(longitude);
         latlong.push(point);
         console.log("Latlon")
         windspeed.push(parseInt(entry.max_wind))
         hurdata['Coordinates'] = latlong;
         hurdata['Wind Speed'] = windspeed;
         
         object[name_year] = hurdata;
      }
      // console.log(latlong);
      else {
         latlong = []
         windspeed = []
         hurdata = {}
         new_name_year = `${entry.name}_${entry.year}`;
         names_years.push(new_name_year);
      }
      // console.log(names_years);
         
      //// ****** Irina'as code ******* /////
      // Add control for layers


      let type = entry.name_year;

      // assign feature type
      if (type === "Andrew_1992") {featureType = "Hurricane_Andrew_1992";}
      else if (type === "Charley_2004") {featureType = "Hurricane_Charley_2004";}
      else if (type === "Harvey_2017") {featureType = "Hurricane_Harvey_2017";}
      else if (type === "Ike_2008") {featureType = "Hurricane_Ike_2008";}
      else if (type === "Irma_2017") {featureType = "Hurricane_Irma_2017";}
      else if (type === "Ivan_2004") {featureType = "Hurricane_Ivan_2004";}
      else if (type === "Katrina_2005") {featureType = "Hurricane_Katrina_2005";}
      else if (type === "Rita_2005") {featureType = "Hurricane_Rita_2005";}
      else if (type === "Sandy_2012") {featureType = "Hurricane_Sandy_2012";}
      else {featureType = "Hurricane_Wilma_2005";}
      // console.log(featureType);


      // draw the data with custom colors and proportional circle radius
      // console.log(object);

      // var hurricane = object.Andrew_1992;
      // var line = hurricane.Coordinates;


      // const newFeature = L.polyline(line, {
      //    color: "red",
      //    weight: 1
      //    // color: getColor(sig),
      //    // fillOpacity: 0.7,
      //    // radius: radius
      // });

      // // Add features to the layers according to their types
      // newFeature.addTo(layers[featureType]);

      // // newFeature.bindPopup(`<h3>${type}: ${place}</h3><hr>
      // //   <h4>Time: ${date}</h4><hr>
      // //   <h4>Magnitude: ${mag}</h4><hr>
      // //   <h4>Significance: ${sig}</h4>`, {maxWidth: 560}) //
      // // .addTo(myMap)
   

      
   })
   // console.log(data);

      // Create an initial map object
      // const myMap = L.map("geomap").setView([25.07, -70.1], 4);

      
      // Add dropdown layer controls for all hurricanes

// })
   //   })







   // // draw the data with custom colors and proportional circle radius
   // var hurricane = object.Katrina_2005;
   // console.log(hurricane);
   // var line = hurricane.Coordinates;
   
   // const newFeature = L.polyline(line, {
   //    color: "red",
   //    weight: .5
   //    // color: getColor(sig),
   //    // fillOpacity: 0.7,
   //    // radius: radius
   // });

   // // newFeature.addTo(layers[Hurricane_Katrina_2005]);

   

   // //// **************************** /////


   // //  console.log(line)

   //  // Create a polyline using the line coordinates and pass in some initial options
   //  L.polyline(line, {
   //    color: "red"
   //  }).addTo(myMap);



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
         [0, '#e1e7e7'], [0.2, '#9a9f9f'],
         [0.4, '#848888'], [0.6, '#6f7171'],
         [0.8, '#5b5c5c'], [1, '#474747']
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


// // ************************************************************************************************************************************************
// // ************************************************************************************************************************************************
// // *************************************************                                    ***********************************************************
// // *************************************************            TOP 10 GEOMAP           ***********************************************************
// // *************************************************                                    ***********************************************************
// // ************************************************************************************************************************************************
// // ************************************************************************************************************************************************

// const top10 = async() => {
//    // here below this line is the code for Neil
//    const data = await (await fetch("/top10")).json();
//    console.log(data);
//    var lat_lon = data.map(entry => entry.lat_lon);
//    var name = data.map(entry => entry.name);
//    var name_year = data.map(entry => entry.name_year);
//    var hurricane_id = data.map(entry => parseInt(entry.hurricane_id));
//    var max_wind = data.map(entry => parseInt(entry.max_wind));
//    var air_pressure = data.map(entry => parseInt(entry.air_pressure));
//    var time = data.map(entry => parseInt(entry.time));
//    var lat_lon = data.map(entry => entry.lat_lon);
//    var norm_damage_usd = data.map(entry => entry.norm_damage_usd);
//    var damage_usd = data.map(entry => entry.damage_usd);
   
//    // console.log(damage_usd);

//    // var costs = data.map(entry => parseInt(entry.total_damage))


   
//    // Create an initial map object
//    const myTop10Map = L.map("top10").setView([25.07, -70.1], 4);

//    //  // Add a tile layer to map
//    //  const dark = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
//    //    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
//    //    id: "dark-v10",
//    //    accessToken: API_KEY
//    //  }).addTo(myMap);

//    const light = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
//       attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
//       maxZoom: 18,
//       id: "light-v10",
//       accessToken: API_KEY
//       }).addTo(myTop10Map);


    // // *************** EXAMPLE MAPPING ABLE_1950 *****************
   //  var hurricane = object.Able_1950
   //  var line = hurricane.Coordinates
   //  console.log(line)

    // // **********************************************************

    // Create a polyline using the line coordinates and pass in some initial options
   //  L.polyline(line, {
   //    color: "red"
   //  }).addTo(myMap);

// }

// top10();

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
