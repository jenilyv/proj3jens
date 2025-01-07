let resultJson;

var map = L.map('map').fitBounds([
    [24.396308, -125.000000], // Southwest corner (latitude, longitude)
    [49.384358, -66.934570]  // Northeast corner (latitude, longitude)
  ]);


L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

function createHeatmap(csvFile) {
    Papa.parse(csvFile, {
        download: true,
        header: true, // Use the first row as column names
        complete: function(results) {
            3
            
            // Parse the data into heatmap points
            var heatData = results.data.map(row => {
                const lat = parseFloat(row.latitude);
                const lon = parseFloat(row.longitude);
                const intensity = parseFloat(row.intensity) || 1; // Default intensity is 1
                if (!isNaN(lat) && !isNaN(lon)) {
                    return [lat, lon, intensity];
                }
            }).filter(point => point); // Remove invalid points

            console.log('Heatmap Data:', heatData);

            // Create the heatmap layer
            L.heatLayer(heatData, {
                radius: 25, // Radius of heatmap points
                blur: 15,   // Blur intensity
                maxZoom: 17 // Maximum zoom level for the heatmap
            }).addTo(map);
        },
        error: function(err) {
            console.error('Error parsing CSV:', err);
        }
    });
}

// Load the CSV file
createHeatmap('Resources/geocded.csv');

// fetch('http://127.0.0.1/latlong')
//   .then((response) => {
//     return response.json();
//   })
//   .then((myJson) => {
//     resultJson = myJson
//     console.log(resultJson);
//   });

