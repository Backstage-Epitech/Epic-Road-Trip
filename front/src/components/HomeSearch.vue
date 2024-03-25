<template>
  <v-container class="home_search_container">
    <div class="home_search_title bg-grey-lighten-5">Cherchez</div>
    <div class="home_search_content bg-grey-lighten-5 pa-6">
      <form action="#" class="home_search_form" id="home_search_form">
        <div
          class="d-flex flex-lg-row flex-column align-items-start justify-content-lg-between justify-content-start"
        >
          <div>
            <VueDatePicker v-model="date" range :enable-time-picker="false" />
          </div>
          <input
            type="text"
            class="search_input search_input_2 bg-white"
            placeholder="Ville de départ"
            aria-label="City"
          />
          <input
            type="text"
            class="search_input search_input_3 bg-white"
            placeholder="Destination"
            aria-label="Destination"
          />
          <input
            type="text"
            class="search_input search_input_4 bg-white"
            placeholder="Budget"
            aria-label="Euros"
          />
          <button class="home_search_button">search</button>
        </div>
      </form>
    </div>
  </v-container>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

const date = ref()
onMounted(() => {
  const startDate = new Date()
  startDate.setHours(0, 0, 0, 0)
  const endDate = new Date(new Date().setDate(startDate.getDate() + 7))
  date.value = [startDate, endDate]
})
</script>

<style>
.home_search_container {
  top: -353px;
  width: calc(100% + 122px);
  left: -61px;
  padding-top: 47px;
  padding-left: 61px;
  padding-right: 61px;
  background: rgba(255, 255, 255, 0.26);
  border-radius: 12px;
}

.home_search_title {
  width: 247px;
  height: 55px;
  margin-left: auto;
  margin-right: auto;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  line-height: 55px;
  font-family: 'Oswald', sans-serif;
  font-size: 18px;
  color: #2e2e2e;
  font-weight: 400;
  text-align: center;
}

.search_input {
  height: 50px;
  border: none;
  outline: none;
  padding-left: 17px;
  font-family: 'Oswald', sans-serif;
  font-size: 14px !important;
  font-weight: 500 !important;
  color: #72728c !important;
}

.home_search_button {
  width: 161px;
  height: 52px;
  background: #76931f;
  color: #ffffff;
  font-family: 'Oswald', sans-serif;
  font-size: 16px;
  font-weight: 400;
  text-transform: uppercase;
  border-radius: 20px;
  border: none;
  outline: none;
  cursor: pointer;
}

input.search_input.search_input_4.bg-white {
  width: 80px;
}

input.dp__pointer.dp__input_readonly.dp__input.dp__input_icon_pad.dp__input_reg {
    width: 16em;
    height: 50px;
    font-size: 14px !important;
    border: none;
    color: #72728c !important;
}
</style>
