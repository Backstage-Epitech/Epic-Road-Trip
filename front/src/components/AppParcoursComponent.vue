<template>
  <v-card>
    <v-tabs class="mt-1" v-model="tab" fixed-tabs bg-color="white">
      <v-tab value="one">Itineraire</v-tab>
      <v-tab value="two">Hébergements</v-tab>
      <v-tab value="three">Activités</v-tab>
      <v-tab value="four">Restaurants</v-tab>
      <v-tab value="five">Bars</v-tab>
    </v-tabs>

    <v-card-text>
      <v-window v-model="tab">
        <v-window-item value="one" class="mapTabs"> 
          <MapItinerary />  
        </v-window-item>

        <v-window-item value="two" class="mapTabs">
          <MapResearch research="sleep" />            
        </v-window-item>

        <v-window-item value="three" class="mapTabs">
          <MapResearch research="enjoy" />            
        </v-window-item>

        <v-window-item value="four" class="mapTabs">
          <MapResearch research="eat" />            
        </v-window-item>

        <v-window-item value="five" class="mapTabs">
          <MapResearch research="drink" />            
        </v-window-item>
      </v-window>
    </v-card-text>
  </v-card>
</template>
<script setup lang="ts">
import MapItinerary from '../views/MapItinerary.vue'
import MapResearch from '../views/MapResearch.vue'
import { ref } from 'vue'

  const tab = ref(null)
</script>
<style scoped>
.mapTabs {
  height: 100%; 
  width: 100%;
}
</style>
