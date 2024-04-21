<template>
  <div class="bar-params">
    <GMapAutocomplete
      placeholder="Entrez un nom de ville"
      @place_changed="requestOverpass"
      :options="{ type: ['(cities)'] }"
    >
    </GMapAutocomplete>
    <fieldset class="display">
      <div class="mr-7">
        <input
          type="radio"
          id="sleep"
          name="research"
          value="sleep"
          @change="updateResearch('sleep')"
        />
        <label for="sleep">Hotel 🛎️</label>
      </div>
      <div class="mr-7">
        <input
          type="radio"
          id="enjoy"
          name="research"
          value="enjoy"
          @change="updateResearch('enjoy')"
        />
        <label for="enjoy">Activités ⚽</label>
      </div>
      <div class="mr-7">
        <input type="radio" id="eat" name="research" value="eat" @change="updateResearch('eat')" />
        <label for="eat">Restaurants 🍴</label>
      </div>
      <div class="mr-7">
        <input
          type="radio"
          id="drink"
          name="research"
          value="drink"
          @change="updateResearch('drink')"
        />
        <label for="drink">Bars 🍻</label>
      </div>
    </fieldset>

    <button @click="captureScreenshot" id="btnScreenshot" type="button" class="btn btn-primary">
      Télécharger le pdf
    </button>
  </div>
  <div id="layout">
    <div ref="mapContainer" :id="'mapContainer' + this.numbercomposant" class="map-container"></div>
  </div>
</template>

<script lang="ts">
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'
import mapboxgl from 'mapbox-gl'
import axios from 'axios'
axios.defaults.baseURL = 'http://localhost:8081'
mapboxgl.accessToken =
  'pk.eyJ1IjoibWNoYXVtb250IiwiYSI6ImNsdHd6d2x2NzAxMmYycW12dnh1MnhkanUifQ.h8wQjPrzjaEbZmBWH2yBkg'

export default {
  props: {
    numbercomposant: {
      required: true,
      type: String
    }
  },
  data() {
    return {
      place: '',
      research: 'sleep'
    }
  },
  mounted() {
    const map = new mapboxgl.Map({
      container: this.$refs.mapContainer,
      style: 'mapbox://styles/mapbox/streets-v12', // Replace with your preferred map style
      center: [4.835659, 45.764043],
      zoom: 9,
      preserveDrawingBuffer: true
    })

    this.map = map

    this.map.once(`load`, (event) => {
      this.map.resize()
    })

    this.map.on('click', (event) => {
      const features = this.map.queryRenderedFeatures(event.point, {
        layers: [`${this.research}-layer`]
      })
      if (!features.length) {
        return
      }
      const feature = features[0]

      const divElement = document.createElement('div')
      const popupBtn = document.createElement('div')
      popupBtn.innerHTML = `<button id="btnFavoris" type="button" class="btn btn-primary">Ajouter aux favoris</button>`
      divElement.innerHTML = `<h3>${feature.properties.name}</h3><p>${feature.properties.prix}</p>`
      divElement.appendChild(popupBtn)
      popupBtn.addEventListener('click', (e) => {
        console.log('Button clicked')
      })

      const popup = new mapboxgl.Popup({ offset: [0, -15] })
        .setLngLat(feature.geometry.coordinates)
        .setDOMContent(divElement)
        .addTo(this.map)
    })
  },
  unmounted() {
    this.map.remove()
    this.map = null
  },
  methods: {
    async requestOverpass(place) {
      console.log(place)
      console.log(this.research)
      this.place = place
      this.map.setCenter(
        new mapboxgl.LngLat(place.geometry.location.lng(), place.geometry.location.lat())
      )
    },
    async updateResearch(research: string) {
      console.log(this.research)
      console.log(research)
      try {
        this.map.removeLayer(`${this.research}-layer`)
        this.map.removeSource(this.research)
      } catch (_) {}

      console.log(research)
      this.research = research

      console.log(this.research)

      let myGeoJson = ''
      await axios.get('/api/' + this.research + '/' + this.place.name).then((resp) => {
        console.log(resp)

        myGeoJson += `[`

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
                  "id": "${index}",
                  "name": "${element.tags.name && !element.tags.name.includes('"') ? element.tags.name : 'default_name'}",
                  "prix": "${Math.floor(Math.random() * (100 - 20 + 1)) + 20}€"
                }
              }`

          if (index + 1 !== resp.data.length) {
            myGeoJson += ', '
          } else {
            myGeoJson += ']'
          }
        })
      })

      console.log(myGeoJson)
      this.map.addSource(this.research, {
        type: 'geojson',
        // Use a URL for the value for the `data` property.
        data: {
          type: 'FeatureCollection',
          features: JSON.parse(myGeoJson)
        }
      })

      this.map.addLayer({
        id: `${this.research}-layer`,
        type: 'circle',
        source: `${this.research}`,
        paint: {
          'circle-radius': 4,
          'circle-stroke-width': 2,
          'circle-color': '#007bff',
          'circle-stroke-color': 'white'
        }
      })
    },
    async captureScreenshot() {
      const element = document.getElementById(`${'mapContainer' + this.numbercomposant}`)

      // Get the dimensions of the content within the mapContainer
      const elementWidth = element.scrollWidth
      const elementHeight = element.scrollHeight

      // Create a canvas with the dimensions of the content
      const canvas = document.createElement('canvas')
      const context = canvas.getContext('2d')
      canvas.width = elementWidth
      canvas.height = elementHeight

      html2canvas(element, {
        useCORS: true,
        logging: true, // Enable logging to check for any potential errors
        width: elementWidth,
        height: elementHeight,
        x: 0, // Position of the top-left corner of the canvas within the element
        y: 0
      })
        .then(async (canvas) => {
          const pdf = new jsPDF('landscape')

          // Add title
          const title = 'Carte exportée au format .PDF'
          const titleX = (pdf.internal.pageSize.width - pdf.getStringUnitWidth(title) * 5) / 2 // Center horizontally
          const titleY = 20 // Adjust positioning as needed
          pdf.setFontSize(18)
          pdf.text(titleX, titleY, title)

          // Add map image
          const imgData = canvas.toDataURL('image/png')
          const imgWidth = elementWidth * 0.2 // Adjust scale as needed
          const imgHeight = elementHeight * 0.2 // Adjust scale as needed
          const imgX = (pdf.internal.pageSize.width - imgWidth) / 2 // Center horizontally
          const imgY = 40 // Adjust positioning as needed
          pdf.addImage(imgData, 'PNG', imgX, imgY, imgWidth, imgHeight)
          pdf.save('map_export.pdf')
        })
        .catch((error) => {
          console.error('Error capturing screenshot:', error)
        })
    }
  }
}
</script>

<style scoped>
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
  color: white;
}

input[type='radio'] {
  appearance: none;
  -webkit-appearance: none;
  width: 20px;
  height: 20px;
  border: 1px solid #2c7f94;
  border-radius: 50%;
  margin-right: 10px;
  background-color: transparent;
  position: relative;
  top: 6px;
}

input[type='radio']:checked::before {
  content: '';
  display: block;
  width: 12px;
  height: 12px;
  background-color: #89ce51;
  border-radius: 50%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  animation: appear 0.8s;
}

.display {
  display: flex;
}

.bar-params {
  align-items: center;
  display: flex;
  justify-content: space-between;
}
</style>
