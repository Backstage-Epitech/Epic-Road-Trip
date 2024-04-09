<template>
  <div id="layout">
    <div ref="mapContainer" class="map-container"></div>
    </div>
</template>

<script>
import mapboxgl from "mapbox-gl";
mapboxgl.accessToken = "pk.eyJ1IjoibWNoYXVtb250IiwiYSI6ImNsdHd6d2x2NzAxMmYycW12dnh1MnhkanUifQ.h8wQjPrzjaEbZmBWH2yBkg";

export default { 
  mounted() {
    const map = new mapboxgl.Map({
        container: this.$refs.mapContainer,
        style: "mapbox://styles/mapbox/streets-v12", // Replace with your preferred map style
        center: [4.835659, 45.764043],
        zoom: 9,
    });

    
// an arbitrary start will always be the same
// only the end or destination will change
const start = [4.835659, 45.764043];

// create a function to make a directions request
async function getRoute(end) {
  // make a directions request using cycling profile
  // an arbitrary start will always be the same
  // only the end or destination will change
  const query = await fetch(
    `https://api.mapbox.com/directions/v5/mapbox/driving/${start[0]},${start[1]};${end[0]},${end[1]}?steps=true&geometries=geojson&access_token=${mapboxgl.accessToken}`,
    { method: 'GET' }
  );
  const json = await query.json();
  const data = json.routes[0];
  const route = data.geometry.coordinates;
  const geojson = {
    type: 'Feature',
    properties: {},
    geometry: {
      type: 'LineString',
      coordinates: route
    }
  };
  // if the route already exists on the map, we'll reset it using setData
  if (map.getSource('route')) {
    map.getSource('route').setData(geojson);
  }
  // otherwise, we'll make a new request
  else {
    map.addLayer({
      id: 'route',
      type: 'line',
      source: {
        type: 'geojson',
        data: geojson
      },
      layout: {
        'line-join': 'round',
        'line-cap': 'round'
      },
      paint: {
        'line-color': '#3887be',
        'line-width': 5,
        'line-opacity': 0.75
      }
    });
  }
  // add turn instructions here at the end
}

map.on('load', () => {
  // make an initial directions request that
  // starts and ends at the same location
  getRoute(start);

  // Add starting point to the map
  map.addLayer({
    id: 'point',
    type: 'circle',
    source: {
      type: 'geojson',
      data: {
        type: 'FeatureCollection',
        features: [
          {
            type: 'Feature',
            properties: {},
            geometry: {
              type: 'Point',
              coordinates: start
            }
          }
        ]
      }
    },
    paint: {
      'circle-radius': 10,
      'circle-color': '#3887be'
    }
  });
  // this is where the code from the next step will go
});

map.on('click', (event) => {
  const coords = Object.keys(event.lngLat).map((key) => event.lngLat[key]);
  console.log("Coordonnées : " + coords);
  const end = {
    type: 'FeatureCollection',
    features: [
      {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'Point',
          coordinates: coords
        }
      }
    ]
  };
  if (map.getLayer('end')) {
    map.getSource('end').setData(end);
  } else {
    map.addLayer({
      id: 'end',
      type: 'circle',
      source: {
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features: [
            {
              type: 'Feature',
              properties: {},
              geometry: {
                type: 'Point',
                coordinates: coords
              }
            }
          ]
        }
      },
      paint: {
        'circle-radius': 10,
        'circle-color': '#f30'
      }
    });
  }
  getRoute(coords);
});

    this.map = map;
  },
  unmounted() {
  this.map.remove();
  this.map = null;
  }
};
</script>

<style>
.map-container {
  flex: 1;
  height: 100%;
}

#layout {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  height: 80vh;
}
</style>