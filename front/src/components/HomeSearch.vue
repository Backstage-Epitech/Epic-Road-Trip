<template>
  <v-container class="home_search_container">
    <div class="home_search_title bg-grey-lighten-5">Cherchez</div>
    <div class="home_search_content bg-grey-lighten-5 pa-6">
      <form action="#" class="home_search_form" id="home_search_form">
        <div class="d-flex justify-content-lg-between justify-content-start">
          <div>
            <VueDatePicker v-model="date" range :enable-time-picker="false" />
          </div>
          <v-combobox v-model="cityName" :items="filteredCities" label="City" @input="updateCityList"></v-combobox>
          <input
            type="text"
            class="search_input search_input_3 bg-white"
            placeholder="Destination"
            aria-label="Destination"
          />
          <div class="input-wrapper">
            <input
              type="number"
              step="10"
              class="search_input search_input_4 bg-white"
              placeholder="Budget"
              aria-label="Euros"
            />
            <span class="currency-symbol">€</span>
          </div>
          <button class="home_search_button">search</button>
        </div>
        <p class="text-medium-emphasis text-caption text-center mt-5">
          {{ 'Laissez le champ destination vide et laissez vous surprendre.' }}
        </p>
      </form>
    </div>
  </v-container>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, reactive } from 'vue'
import axios from 'axios'

const date = ref()
const cityName = ref('')
const selectedCity = ref('')
const cities = reactive<City[]>([])

//const cities = reactive([]);


interface City {
  name: string
  departement: string
  code: string
}

onMounted(() => {
  const startDate = new Date()
  startDate.setHours(0, 0, 0, 0)
  const endDate = new Date(new Date().setDate(startDate.getDate() + 7))
  date.value = [startDate, endDate]
})

const filteredCities = computed(() => {
  return cities.value.filter((city) =>
    city.name.toLowerCase().includes(cityName.value.toLowerCase())
  )
})

const updateCityList = async () => {
  try {
    console.log('test')
    const response = await axios.get<City[]>(
      `https://geo.api.gouv.fr/communes?nom=${cityName.value}&fields=departement&limit=7`
    )
    cities.value = response.data.map((city) => ({
      name: city.nom,
      departement: city.departement,
      code: city.code
    }))
    console.log(cities.value)
  } catch (error) {
    console.error(error)
  }
}
</script>

<style scoped>
.ac-subtitle {
  color: grey;
}
</style>
