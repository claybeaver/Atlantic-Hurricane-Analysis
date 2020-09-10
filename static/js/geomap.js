function buildGeoMap() {

  // Create an initial map object
  // Set the longitude, latitude, and the starting zoom level
  const map = L.map('map',
{
    center:[40.71, -74],
    zoom: 11
});

const myStyle = {
    "color": "#ff7800",
    "weight": 5,
    "opacity": 0.65
};

  // Add a tile layer (the background map image) to our map
  // Use the addTo method to add objects to our map

  L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
  maxZoom: 18,
  id: "mapbox/streets-v11",
  tileSize: 512,
  zoomOffset: -1,
  accessToken: API_KEY
}).addTo(map);

  // L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  //   attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
  //   tileSize: 512,
  //   maxZoom: 18,
  //   zoomOffset: -1,
  //   id: "mapbox/streets-v11",
  //   accessToken: API_KEY
  // }).addTo(map);

  // // Create a new marker
  // L.marker([45.52, -122.67]).addTo(map);

  // // Create a circle and pass in some initial options
  // L.circle([45.52, -122.69], {
  //   color: "green",
  //   fillColor: "green",
  //   fillOpacity: 0.75,
  //   radius: 500
  // }).addTo(map);

  // // Create a Polygon and pass in some initial options
  // L.polygon([
  //   [45.54, -122.68],
  //   [45.55, -122.68],
  //   [45.55, -122.66]
  // ], {
  //   color: "yellow",
  //   fillColor: "yellow",
  //   fillOpacity: 0.75
  // }).addTo(map);

  // // Coordinates for each point to be used in the polyline
  // const line = [
  //   [45.51, -122.68],
  //   [45.50, -122.60],
  //   [45.48, -122.70],
  //   [45.54, -122.75]
  // ];

  // // Create a polyline using the line coordinates and pass in some initial options
  // L.polyline(line, {
  //   color: "red"
  // }).addTo(map);

  // // Create a rectangle and pass in some initial options
  // L.rectangle([
  //   [45.55, -122.64],
  //   [45.54, -122.61]
  // ], {
  //   color: "black",
  //   weight: 3,
  //   stroke: true
  // }).addTo(map);
}

buildGeoMap();