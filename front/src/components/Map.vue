<template>
  <div id="layout">
    <div ref="mapContainer" class="map-container"></div>
  </div>
</template>

<script setupt lang="ts">
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

    map.addControl(
        new MapboxDirections({
            accessToken: mapboxgl.accessToken
        }),
        'top-left'
    );

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

.mapboxgl-control-container {
  position: absolute;
}

#layout {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  height: 80vh;
}

mapboxgl-canvas {
    width: 1500px !important   ;
} 
</style>