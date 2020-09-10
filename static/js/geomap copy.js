// function mapHurricane(sample) {

//   const url = "/jsondata";
//   d3.json(url).then(function (data) {
//     console.log(data);

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
//     const myMap = L.map("geomap").setView([25.07, -70.1], 4);

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





  // function buildLeaflet() {
  //   const url = "/jsondata";
  //   d3.json(url).then(function (data) {
  //     console.log(data);
  //     // The first parameter are the coordinates of the center of the map
  //     // The second parameter is the zoom level
  //     var map = L.map('geomap').setView([29.712, -90.006], 11);
      
  //     // {s}, {z}, {x} and {y} are placeholders for map tiles
  //     // {x} and {y} are the x/y of where you are on the map
  //     // {z} is the zoom level
  //     // {s} is the subdomain of cartodb
  //       var layer = L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
  //       attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="http://cartodb.com/attributions">CartoDB</a>'
  //     });
      
  //     // Now add the layer onto the map
  //     map.addLayer(layer);
      
  //   })
  // }

  // buildLeaflet();