function buildGraph(sample) {
  const url = "/maxwinds";
  d3.json(url).then(function(data){
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
      xaxis: { title: "Maximum winds" },
      // yaxis: maxwind,
      width: 400,
      margin: {
        l: 100,
        r: 10,
        b: 100,
        t: 100,
        pad: 10}
    };
    Plotly.newPlot("plot", data, layout);
  })
};

buildGraph();

function geoJsonMap(sample) {
  const url = "/jsondata";
  const url2 = "https://leafletjs.com/examples/choropleth/us-states.js"
  // d3.json(url2).then(function(data){
    // console.log(data);
    // const myMap = L.map("geoJsonMap", {
    //   center: [29.75, -95.36],
    //   zoom: 4
    // });
    d3.json(url2).then(function(data){
      console.log(data);
    
    // Adding a tile layer (the background map image) to our map
    // We use the addTo method to add objects to our map
    var mapboxAccessToken = "pk.eyJ1IjoiaXJpbmFocGRhIiwiYSI6ImNrZTk5ZWl6czB0ZGIyeHJucnBidXF4NG0ifQ.5yKGPM6y8H8d_d_Gj8KAVw";

    var map = L.map('geoJsonMap').setView([37.8, -96], 4);

    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=' + mapboxAccessToken, {
        id: 'mapbox/light-v9',
        attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
        tileSize: 512,
        zoomOffset: -1
    }).addTo(map);

    L.geoJson(statesData).addTo(map);

  })
};

geoJsonMap();


