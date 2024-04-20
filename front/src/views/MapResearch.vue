  <template>
    <div>
      <GMapAutocomplete
        placeholder="This is a placeholder"
        @place_changed="requestOverpass"
        :options="{type: ['(cities)']}"
      >
      </GMapAutocomplete>
      <button @click="captureScreenshot" id="btnScreenshot" type="button" class="btn btn-primary">Télécharger le pdf</button>
    </div>
    <div id="layout">
      <div ref="mapContainer" id="mapContainer" class="map-container"></div>
    </div>
  </template>
  
  <script>
  import html2canvas from 'html2canvas';
  import jsPDF from 'jspdf';
  import mapboxgl from "mapbox-gl";
  import axios from 'axios';
  axios.defaults.baseURL = 'http://localhost:8081';
  mapboxgl.accessToken = "pk.eyJ1IjoibWNoYXVtb250IiwiYSI6ImNsdHd6d2x2NzAxMmYycW12dnh1MnhkanUifQ.h8wQjPrzjaEbZmBWH2yBkg";
  
  export default {
    props: {
      research: {
        required: true,
        type: String
      }
    },
    data() {
      return {
        place: String
      }
    },
    mounted() {
      const map = new mapboxgl.Map({
          container: this.$refs.mapContainer,
          style: "mapbox://styles/mapbox/streets-v12", // Replace with your preferred map style
          center: [4.835659, 45.764043],
          zoom: 9,
          preserveDrawingBuffer: true
      });
  
      this.map = map;

      this.map.once(`load`, (event) => {
        this.map.resize();
      });
    },
    unmounted() {
    this.map.remove();
    this.map = null;
    },
    methods: {
      async requestOverpass(place) {
        console.log(place)
        console.log(this.research)
        this.place = place;
        this.map.setCenter(new mapboxgl.LngLat(place.geometry.location.lng(), place.geometry.location.lat()));

        let myGeoJson = '';
        await axios.get('/api/' + this.research + '/' + this.place.name)
        .then(resp => {
            console.log(resp);

            myGeoJson += '{ "type": "FeatureCollection", "features": ['

            resp.data.forEach((element, index) => {
              myGeoJson += `{
                "type": "Feature",
                "geometry": {
                  "type": "Point",
                  "coordinates": [
                    ${element.lon},
                    ${element.lat}
                  ]
                },
                "properties": {
                  "name": "${element.tags.name ? element.tags.name : "default_name"}",
                  "prix": "${Math.floor(Math.random() * (100 - 20 + 1)) + 20}€"
                }
              }`;

              if (index+1 !== resp.data.length) {
                myGeoJson += ',';
              } else {
                myGeoJson += ']}';
              }
            });
        });

        console.log(myGeoJson);
        this.map.on(`click`, () => {
          this.map.addSource('earthquakes', {
            type: 'geojson',
            // Use a URL for the value for the `data` property.
            data: myGeoJson
          });

          this. map.addLayer({
            'id': 'earthquakes-layer',
            'type': 'circle',
            'source': 'earthquakes',
            'paint': {
              'circle-radius': 4,
              'circle-stroke-width': 2,
              'circle-color': 'red',
              'circle-stroke-color': 'white'
            }
          });
        })
      },
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
          const title = 'Carte exportée au format .PDF';
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
    display: block;
    position: absolute; 
    top: 0;
    bottom: 0;
    width: 100%;
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
  
  #btnScreenshot {
    margin: 10px;
  }
  </style>