<template>
  <v-container class="home_search_container">
    <div class="home_search_title bg-grey-lighten-5">Cherchez</div>
    <div class="home_search_content bg-grey-lighten-5 pa-6">
      <form action="#" class="home_search_form" id="home_search_form">
        <div class="d-flex justify-content-lg-between justify-content-start">
          <div>
            <VueDatePicker v-model="date" range :enable-time-picker="false" />
          </div>
          <model-list-select
            :list="cities"
            v-model=stringItem
            option-value="code"
            :custom-text="formatCity"
            @searchchange="updateCityList"
            @update:modelValue="stringItem"
            placeholder="select item"
          >
          </model-list-select>
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
import { ref, onMounted } from 'vue'
import { ModelListSelect } from 'vue-search-select'
import axios from 'axios'

const date = ref()
const stringItem = ref('')
const cities = ref<City[]>([])

const formatCity = (city: City) => `${city.nom} - ${city.code} - ${city.departement}`

interface City {
  nom: string
  departement: string
  code: string
}

onMounted(() => {
  const startDate = new Date()
  startDate.setHours(0, 0, 0, 0)
  const endDate = new Date(new Date().setDate(startDate.getDate() + 7))
  date.value = [startDate, endDate]
})

const updateCityList = async (searchText: string) => {
  try {
    const currentSelection = stringItem.value
    const response = await axios.get<City[]>(
      `https://geo.api.gouv.fr/communes?nom=${searchText}&fields=departement&limit=7`
    )
    cities.value = response.data.map((city) => ({
      nom: city.nom,
      departement: city.departement.nom,
      code: city.code
    }))
    stringItem.value = currentSelection
    console.log(stringItem)
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
