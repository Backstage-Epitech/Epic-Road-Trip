<template>
  <v-card>
    <v-tabs class="mt-1" v-model="tab" fixed-tabs bg-color="white">
      <v-tab value="one">Itineraire</v-tab>
      <v-tab value="two">Hébergements</v-tab>
      <v-tab value="three">Activités</v-tab>
      <v-tab value="three">Restaurants et bars</v-tab>
    </v-tabs>

    <v-card-text>
      <v-window v-model="tab">
        <v-window-item value="one"> 
          <Map />  
        </v-window-item>

        <v-window-item value="two">
          <v-row class="flex-child text-subtitle-2 mt-3">
            <v-col class="d-flex" cols="12" md="2">
              <v-row class="ma-n3">
                <v-col cols="12">
                  <v-sheet class="d-flex" color="red-lighten-3" height="250">
                    <sheet-footer> #5: (2r x 2c) </sheet-footer>
                  </v-sheet>
                </v-col>
              </v-row>
            </v-col>

            <v-col class="d-flex" cols="12" md="8">
              <v-row class="ma-n3">
                <v-col cols="12">
                  <v-sheet class="d-flex" color="red-lighten-3" height="250">
                    <sheet-footer> #5: (2r x 2c) </sheet-footer>
                  </v-sheet>
                </v-col>
              </v-row>
            </v-col>

            <v-col class="d-flex" cols="12" md="2">
              <v-row class="ma-n3">
                <v-col cols="12">
                  <v-sheet class="d-flex" color="red-lighten-3" height="250">
                    <sheet-footer> #5: (2r x 2c) </sheet-footer>
                  </v-sheet>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-window-item>

        <v-window-item value="three"> Three </v-window-item>
      </v-window>
    </v-card-text>
  </v-card>
</template>
<script setup lang="ts">
import MapItinerary from './MapItinerary.vue'
import { ref } from 'vue'

  const tab = ref(null)
</script>
<style scoped>

</style>
