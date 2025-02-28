// Create the basemap tile layer
let basemap = L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: "© OpenStreetMap Contributors"
});

// Create the map object with center and zoom options
let map = L.map("map", {
  center: [20, 0], // Center of the world
  zoom: 2,
  layers: [basemap] // Add the basemap layer to start
});

// Function to determine the marker size based on magnitude
function getRadius(magnitude) {
  return magnitude ? magnitude * 5 : 1; // Scale up for better visibility
}

// Function to determine marker color based on depth
function getColor(depth) {
  return depth > 90 ? "#FF0000" : // Red for deepest
         depth > 70 ? "#FF4500" : // Orange-red
         depth > 50 ? "#FFA500" : // Orange
         depth > 30 ? "#FFD700" : // Gold
         depth > 10 ? "#9ACD32" : // Yellow-green
                      "#00FF00";  // Green for shallow
}

// Function to define the style of each marker
function styleInfo(feature) {
  return {
      radius: getRadius(feature.properties.mag),
      fillColor: getColor(feature.geometry.coordinates[2]), // Depth determines color
      color: "#000",
      weight: 0.5,
      opacity: 1,
      fillOpacity: 0.8
  };
}

// Load earthquake data
d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson").then(function(data) {
  console.log(data); // Debugging to confirm data loads

  // Add the earthquake data to the map
  L.geoJson(data, {
      pointToLayer: function(feature, latlng) {
          return L.circleMarker(latlng);
      },
      style: styleInfo,
      onEachFeature: function(feature, layer) {
          layer.bindPopup(`<strong>Location:</strong> ${feature.properties.place}<br>
                           <strong>Magnitude:</strong> ${feature.properties.mag}<br>
                           <strong>Depth:</strong> ${feature.geometry.coordinates[2]} km`);
      }
  }).addTo(map);

  // Create a legend control object
  let legend = L.control({ position: "bottomright" });

  // Add legend details
  legend.onAdd = function() {
    let div = L.DomUtil.create("div", "info legend");
    let depthIntervals = [-10, 10, 30, 50, 70, 90]; // Depth categories
    let colors = ["#00FF00", "#9ACD32", "#FFD700", "#FFA500", "#FF4500", "#FF0000"]; // Colors matching depth

    div.innerHTML = "<h4>Depth (km)</h4>";

    // Loop through intervals and generate a label with a colored square for each depth range
    for (let i = 0; i < depthIntervals.length; i++) {
      div.innerHTML +=
          `<i style="background:${colors[i]}; width: 15px; height: 15px; display: inline-block; margin-right: 5px;"></i> 
          ${depthIntervals[i]} ${depthIntervals[i + 1] ? `&ndash; ${depthIntervals[i + 1]} km<br>` : "+ km"}`;
    }

    return div;
  };

  // Add the legend to the map
  legend.addTo(map);
});
