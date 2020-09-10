function mapHurricane(sample) {

  const url = "/jsondata";
  d3.json(url).then(function (data) {
    // console.log(data);

    let latlong = [];
    let names_years = ['Able_1950'];
    let name_year;
    let object = {};

    data.forEach((entry, index) => {
      name_year = `${entry.name}_${entry.year}`;
      if (names_years.indexOf(name_year) > -1) {
        var point = []
        point.push(parseInt(entry.latitude))
        point.push(parseInt(entry.longitude))
        object[name_year]
        latlong.push([point])
        object[name_year] = latlong;
      }
      //console.log(latlong);
      else {
        latlong = []
        new_name_year = `${entry.name}_${entry.year}`;
        names_years.push(new_name_year);
      }
    })

    // console.log(object);

    // // ******** OLD CODE FOR CONCAT LAT/LON *********
    // var coordinates = []
    // for (var i = 0; i < latitudes.length; i++) {
    //   coordinates[i] = [latitudes[i], longitudes[i]];
    // }
    // // **********************************************
    // console.log(latitudes);
    // console.log(longitudes);
    // console.log(coordinates);
    // console.log(hurricaneName);
    // console.log(names_years);

    // Create an initial map object
    const myMap = L.map("map").setView([25.07, -70.1], 4);

    // Add a tile layer to map
    L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
      attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
      tileSize: 512,
      maxZoom: 18,
      zoomOffset: -1,
      id: "mapbox/streets-v11",
      accessToken: API_KEY
    }).addTo(myMap);

    // // *************** EXAMPLE MAPPING ABLE_1950 *****************
    // const ableLine = [
    //   [17.02, -55.08],
    //   [17.12, -56.05],
    //   [18.03, -57.07],
    //   [19, -58.1],
    //   [20, -60],
    //   [20.12, -61.02],
    //   [21.05, -62.03],
    //   [22, -63.03],
    //   [22.12, -63.13],
    //   [23.02, -64.1],
    //   [23.07, -65.07],
    //   [23.15, -66],
    //   [24.07, -66.03],
    //   [24.13, -66.08],
    //   [25.03, -66.13],
    //   [25.08, -67.08],
    //   [25.12, -68.02],
    //   [25.12, -68.12],
    //   [25.08, -69.05],
    //   [25.07, -69.13],
    //   [25.07, -70.1],
    //   [25.07, -71.08],
    //   [25.08, -72.1],
    //   [25.15, -73.05],
    //   [26.12, -73.15],
    //   [27.05, -74.07],
    //   [27.15, -74.15],
    //   [28.07, -75.05],
    //   [29.02, -75.08],
    //   [29.15, -75.08],
    //   [30.12, -75.08],
    //   [31.12, -75.08],
    //   [32.13, -75.03],
    //   [34.07, -74.05],
    //   [36, -72.12],
    //   [37.1, -71],
    //   [39.05, -69.07],
    //   [41.03, -67.05],
    //   [43.05, -65],
    //   [44.1, -63.12],
    //   [45.08, -62.1],
    //   [47.15, -59.13],
    //   [50, -56.13],
    //   [52, -53.13],
    //   [53.1, -50.12],
    //   [54.12, -47.12],
    //   [55.05, -44.13],
    //   [55.05, -41.13],
    //   [54.08, -37.12],
    //   [53.08, -33.12],
    //   [52.08, -30.05]
    // ];
    // // **********************************************************

    // Create a polyline using the line coordinates and pass in some initial options
    // L.polyline(coordinates, {
    //   color: "red"
    // }).addTo(myMap);

  })
}

mapHurricane();







function buildGraph(sample) {
  const url = "/maxwinds";
  d3.json(url).then(function (data) {
    // console.log(data);
    const names = data.map(entry => entry.name_year);
    const maxwind = data.map(entry => entry.max_wind);
    // console.log(names);
    // console.log(maxwind);    

    const title = `Maximum winds`;
    const trace = {
      x: maxwind,
      y: names,
      type: 'bar',
      orientation: 'h',
      title: title,
      text: maxwind,
    };
    var data = [trace];
    var layout = {
      title: {
        text: title,
        font: {
          size: 12
        },
      },
      font: {
        size: 8,
      },
      xaxis: {
        title: "Maximum winds"
      },
      // yaxis: maxwind,
      width: 400,
      margin: {
        l: 100,
        r: 10,
        b: 100,
        t: 100,
        pad: 10
      }
    };
    Plotly.newPlot("plot", data, layout);
  })
};

// buildGraph();











// function geoJsonMap(sample) {
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

// //geoJsonMap();

function costwind(sample) {

  const url = "/costwind";
  d3.json(url).then(function (data) {
    console.log(data);

    // let latlong = [];
    // let names_years = ['Able_1950'];
    // let name_year;
    // let object = {};

    // data.forEach((entry, index) => {
    //   name_year = `${entry.name}_${entry.year}`;
    //   if (names_years.indexOf(name_year) > -1) {
    //     var point = []
    //     point.push(parseInt(entry.latitude))
    //     point.push(parseInt(entry.longitude))
    //     object[name_year]
    //     latlong.push([point])
    //     object[name_year] = latlong;
    //   }
    //   //console.log(latlong);
    //   else {
    //     latlong = []
    //     new_name_year = `${entry.name}_${entry.year}`;
    //     names_years.push(new_name_year);
    //   }
    // })

    // console.log(object);
  }
  )}

  costwind();