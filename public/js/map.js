// TO MAKE THE MAP APPEAR YOU MUST
// ADD YOUR ACCESS TOKEN FROM
// https://account.mapbox.com

mapboxgl.accessToken = mapToken;
let coordinates = listing.geometry.coordinates;

if (coordinates && coordinates.length <= 0) {
  coordinates = [78.9629, 20.5937];
}

const map = new mapboxgl.Map({
  container: "map", // container ID
  // Choose from Mapbox's core styles, or make your own style with Mapbox Studio
  style: "mapbox://styles/mapbox/streets-v12", // style URL
  center: coordinates, // starting position [lng, lat]
  zoom: 9, // starting zoom
});

// Create a default Marker and add it to the map.

const iconMarker = function () {
  // Create a DOM element for each marker.
  const el = document.createElement("div");
  el.className = "marker";
  el.style.backgroundImage = `url(
    /images/home.png
  )`;
  el.style.width = `40px`;
  el.style.height = `40px`;
  el.style.padding = "1%";
  el.style.backgrounColor = "rgb(255 56 92);";
  el.style.backgroundSize = "100%";

  new mapboxgl.Marker(el).setLngLat(coordinates).addTo(map);
};

iconMarker();
//Pop-up

const popup = new mapboxgl.Popup({
  offset: 25,
  className: "map-pop",
})
  .setLngLat(coordinates)
  .setHTML("<p>Exact Booking Location</p>")
  .setMaxWidth("800px")
  .addTo(map);
