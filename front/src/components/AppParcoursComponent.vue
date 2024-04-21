<script setup lang="ts">
import MapItinerary from './MapItinerary.vue'
import MapResearch from './MapResearch.vue'
import HotelComponent from './HotelComponent.vue'

import { ref } from 'vue'
import router from '@/router'
import type { LocationQuery } from 'vue-router'

type PlanificationQueryParams = LocationQuery & {
  dates?: string[]
  cityFrom?: `${number}`
  cityDestination?: `${number}`
  budget?: number
}

const queryParams = router.currentRoute.value.query as PlanificationQueryParams

const items = [
  {
    title: 'Date de voyage',
    subtitle: queryParams.dates?.map((date) => new Date(date).toLocaleDateString()).join(' - ')
  },
  { title: 'Ville de départ', subtitle: queryParams.cityFrom },
  { title: 'Ville de destination', subtitle: queryParams.cityDestination },
  {
    title: 'Budget',
    subtitle: queryParams.budget
      ? new Intl.NumberFormat('fr', { style: 'currency', currency: 'EUR' }).format(
          queryParams.budget
        )
      : undefined
  },
  { title: 'Hébergements', subtitle: '' },
  { title: 'Activités', subtitle: '' },
  { title: 'Bars / Restaurants', subtitle: '' }
]

const tab = ref<string>('one')
</script>
<template>
  <v-card height="90vh">
    <v-tabs class="mt-1" v-model="tab" fixed-tabs bg-color="white">
      <v-tab value="one">Itineraire</v-tab>
      <v-tab value="two">Hébergements</v-tab>
      <v-tab value="three">Activités</v-tab>
      <v-tab value="four">Restaurants</v-tab>
      <v-tab value="five">Bars</v-tab>
    </v-tabs>
    <v-row class="flex-child text-subtitle-2 mt-3">
      <v-col cols="12" md="3">
        <v-row class="ma-n3">
          <v-col cols="12">
            <v-sheet class="d-flex" color="bg-grey-lighten-5">
              <v-list lines="one">
                <v-list-item
                  v-for="(item, index) in items"
                  :key="index"
                  :title="item.title"
                  :subtitle="item.subtitle"
                />
              </v-list>
            </v-sheet>
          </v-col>
        </v-row>
      </v-col>

      <v-col class="d-flex" cols="12" md="9">
        <v-row class="ma-n3">
          <v-col cols="12">
            <v-sheet class="d-flex" color="red-lighten-3" height="250">
              <v-card-text>
                <v-window v-model="tab">
                  <v-window-item value="one" class="mapTabs">
                    <MapItinerary />
                  </v-window-item>

                  <v-window-item value="two" class="mapTabs">
                    <HotelComponent />
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
            </v-sheet>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-card>
</template>
<style scoped>
.mapTabs {
  height: 100%;
  width: 100%;
}
</style>
