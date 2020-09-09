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
  const url = "/cost_by_state";
  // d3.json(url2).then(function(data){
    // console.log(data);
    // const myMap = L.map("geoJsonMap", {
    //   center: [29.75, -95.36],
    //   zoom: 4
    // });
    d3.json(url).then(function(data){
      console.log(data);
    
    // Adding a tile layer (the background map image) to our map
    // We use the addTo method to add objects to our map
    // var mapboxAccessToken = API_KEY;

    // var map = L.map('geoJsonMap').setView([37.8, -96], 4);

    const map = L.map("geoJsonMap", {
      center: [29.75, -95.36],
      zoom: 13
    });

    L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
        attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
        maxZoom: 5,
        tileSize: 512,
        id: 'mapbox/streets-v11',
        zoomOffset: -1,
        accessToken: API_KEY
    }).addTo(map);
  })
};

geoJsonMap();


