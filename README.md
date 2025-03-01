Functionalities
1. Data Fetching
* Uses D3.js to fetch live earthquake data from USGS API: https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson
* Parses JSON data to extract relevant earthquake parameters (magnitude, depth, coordinates, location).
2. Map Initialization
* Creates a Leaflet map centered at [20, 0] with zoom level 2.
* Uses OpenStreetMap as the base tile layer: let basemap = L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png");
3. Earthquake Marker Customization
Each earthquake is represented as a circle marker, with:
* Size: Proportional to the earthquake magnitude (scaled up for visibility). function getRadius(magnitude) {
*   return magnitude ? magnitude * 5 : 1;
* }
* Color: Based on earthquake depth (third coordinate in geometry.coordinates). function getColor(depth) {
*   return depth > 90 ? "#FF0000" :
*          depth > 70 ? "#FF4500" :
*          depth > 50 ? "#FFA500" :
*          depth > 30 ? "#FFD700" :
*          depth > 10 ? "#9ACD32" :
*                       "#00FF00";
* }
* Popup on Click: Shows Location, Magnitude, and Depth. layer.bindPopup(`<strong>Location:</strong> ${feature.properties.place}<br>
*                  <strong>Magnitude:</strong> ${feature.properties.mag}<br>
*                  <strong>Depth:</strong> ${feature.geometry.coordinates[2]} km`);
4. Legend Implementation
A color-coded legend is added to indicate depth ranges.
let legend = L.control({ position: "bottomright" });
legend.onAdd = function() {
  let div = L.DomUtil.create("div", "info legend");
  let depthIntervals = [-10, 10, 30, 50, 70, 90];
  let colors = ["#00FF00", "#9ACD32", "#FFD700", "#FFA500", "#FF4500", "#FF0000"];
  
  div.innerHTML = "<h4>Depth (km)</h4>";
  for (let i = 0; i < depthIntervals.length; i++) {
    div.innerHTML += `<i style="background:${colors[i]}; width: 15px; height: 15px; display: inline-block; margin-right: 5px;"></i>
                      ${depthIntervals[i]} ${depthIntervals[i + 1] ? `&ndash; ${depthIntervals[i + 1]} km<br>` : "+ km"}`;
  }
  return div;
};
legend.addTo(map);
5. Additional Features (Optional)
* Overlay of tectonic plate boundaries using GeoJSON data.
* Additional base layers for different map styles.
Installation & Usage
1. Clone the Repository
git clone https://github.com/yourusername/leaflet-challenge.git
cd leaflet-challenge
2. Open in Live Server (VS Code)
* Install Live Server extension in VS Code.
* Right-click on index.html → Click Open with Live Server.
* The earthquake visualization map should now be displayed.
3. Run on Local Server (Manually)
If Live Server is not installed, use Python HTTP Server:
# For Python 3
python -m http.server 8080
Then open http://localhost:8080/ in a browser.
Expected Output
* A world map displaying earthquakes with interactive markers.
* Marker size proportional to magnitude.
* Marker color indicating earthquake depth.
* Popup details with earthquake information.
* Legend for depth interpretation at the bottom-right.
