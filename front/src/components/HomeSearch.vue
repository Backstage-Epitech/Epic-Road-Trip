<template>
  <v-container class="home_search_container">
    <div class="home_search_title bg-grey-lighten-5">Cherchez</div>
    <div class="home_search_content bg-grey-lighten-5 pa-6">
      <form @submit.prevent="goTravel" class="home_search_form" id="home_search_form">
        <div class="d-flex justify-content-lg-between justify-content-start">
          <div>
            <VueDatePicker v-model="dates" range :enable-time-picker="false" />
          </div>
          <model-list-select
            :list="cities"
            v-model="cityFrom"
            option-value="code"
            :custom-text="formatCity"
            @searchchange="updateCityList"
            placeholder="select item"
            class="select-custom"
          />
          <model-list-select
            :list="cities2"
            v-model="cityDestination"
            option-value="code"
            :custom-text="formatCity"
            @searchchange="updateCityDestinationList"
            placeholder="select item"
            class="select-custom"
          />
          <div class="input-wrapper">
            <input
              type="number"
              v-model="budget"
              step="10"
              class="search_input search_input_4 bg-white"
              placeholder="Budget"
              aria-label="Euros"
            />
            <span class="currency-symbol">€</span>
          </div>
          <button class="home_search_button" type="submit">search</button>
        </div>
      </form>
    </div>
  </v-container>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { ModelListSelect } from 'vue-search-select'
import axios from 'axios'
import router, { PLANIFICATION_URL } from '@/router'

const dates = ref<Date[]>([])
const cityFrom = ref('')
const cityDestination = ref('')
const budget = ref(0)

const cities = ref<City[]>([])
const cities2 = ref<City[]>([])

const formatCity = (city: City) =>
  `${city.nom} - ${city.departement.nom} (${city.departement.code})`

interface City {
  nom: string
  departement: {
    code: string
    nom: string
  }
  code: string
}

const travel = computed(() => {
  return {
    dates: dates.value.map(date => date.toJSON().split('T')[0]),
    cityFrom: cityFrom.value,
    cityDestination: cityDestination.value,
    budget: budget.value
  }
})

onMounted(() => {
  const startDate = new Date()
  const endDate = new Date(new Date().setDate(startDate.getDate() + 7))
  dates.value = [startDate, endDate]
})

const updateCityList = async (searchText: string) => {
  try {
    if (searchText === '') return

    const response = await axios.get<City[]>(
      `https://geo.api.gouv.fr/communes?nom=${searchText}&fields=departement&limit=7`
    )
    cities.value = response.data
  } catch (error) {
    console.error(error)
  }
}

const updateCityDestinationList = async (searchText: string) => {
  try {
    if (searchText === '') return

    const response = await axios.get<City[]>(
      `https://geo.api.gouv.fr/communes?nom=${searchText}&fields=departement&limit=7`
    )
    cities2.value = response.data 
  } catch (error) {
    console.error(error)
  }
}

const goTravel = () => {
  router.push({
    path: PLANIFICATION_URL,
    query: travel.value
  })
}
</script>

<style scoped>
.ac-subtitle {
  color: grey;
}

.ui.fluid.search.selection.dropdown.select-custom {
  width: 18em;
}
</style>
