<template>
  <div id="layout">
    <div ref="mapContainer" id="mapContainer" class="map-container"></div>
  </div>
  <button @click="captureScreenshot">Télécharger le pdf</button>
</template>

<script>
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import mapboxgl from "mapbox-gl";
mapboxgl.accessToken = "pk.eyJ1IjoibWNoYXVtb250IiwiYSI6ImNsdHd6d2x2NzAxMmYycW12dnh1MnhkanUifQ.h8wQjPrzjaEbZmBWH2yBkg";

export default { 
  mounted() {
    const map = new mapboxgl.Map({
        container: this.$refs.mapContainer,
        style: "mapbox://styles/mapbox/streets-v12", // Replace with your preferred map style
        center: [4.835659, 45.764043],
        zoom: 9,
        preserveDrawingBuffer: true
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
  },
  methods: {
    captureScreenshot() {
      const element = document.getElementById('mapContainer');

      // Get the dimensions of the content within the mapContainer
      const elementWidth = element.scrollWidth;
      const elementHeight = element.scrollHeight;

      // Create a canvas with the dimensions of the content
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      canvas.width = elementWidth;
      canvas.height = elementHeight;

      html2canvas(element, {
        useCORS: true,
        logging: true, // Enable logging to check for any potential errors
        width: elementWidth,
        height: elementHeight,
        x: 0, // Position of the top-left corner of the canvas within the element
        y: 0
      }).then(canvas => {
        const pdf = new jsPDF('landscape');

        // Add title
        const title = 'Itinéraire exporté au format .PDF';
        const titleX = (pdf.internal.pageSize.width - pdf.getStringUnitWidth(title) * 5) / 2; // Center horizontally
        const titleY = 20; // Adjust positioning as needed
        pdf.setFontSize(18);
        pdf.text(titleX, titleY, title);

        // Add map image
        const imgData = canvas.toDataURL('image/png');
        const imgWidth = elementWidth * 0.20; // Adjust scale as needed
        const imgHeight = elementHeight * 0.20; // Adjust scale as needed
        const imgX = (pdf.internal.pageSize.width - imgWidth) / 2; // Center horizontally
        const imgY = 40; // Adjust positioning as needed
        pdf.addImage(imgData, 'PNG', imgX, imgY, imgWidth, imgHeight);

        pdf.save('map_export.pdf');
      }).catch(error => {
        console.error('Error capturing screenshot:', error);
      });
    }
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
  height: 90vh;
}
</style>