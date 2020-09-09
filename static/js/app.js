function buildGraph(sample) {
  const url = "/maxwinds";
  d3.json(url).then(function(data){
    console.log(data);
    const names = data.map(entry => entry.name_year);
    const maxwind = data.map(entry => entry.max_wind);
    console.log(names);
    console.log(maxwind);    
 
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
  d3.json(url).then(function(data){
    console.log(data);
    const myMap = d3.select("#geoJsonMap");
    
  })
};

geoJsonMap();


