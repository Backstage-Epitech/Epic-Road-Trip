<script setup lang="ts">
import BanerComponent from '../components/BanerComponent.vue'
import LoginComponent from '../components/LoginComponent.vue'
import RegisterComponent from '../components/RegisterComponent.vue'

import { ref } from 'vue'

const tab = ref('')

</script>

<template>
  <BanerComponent />
  <v-card>
    <v-tabs class="mt-1" v-model="tab" fixed-tabs bg-color="white">
      <v-tab value="one">Se connecter</v-tab>
      <v-tab value="two">S'inscrire</v-tab>
    </v-tabs>
    <v-card-text>
      <v-window v-model="tab">
        <v-window-item value="one">
          <LoginComponent />
        </v-window-item>
        <v-window-item value="two"> 
          <RegisterComponent />  
        </v-window-item>
      </v-window>
    </v-card-text>
  </v-card>
</template>

<style scoped>
.img-fond {
  background-image: url('../assets/images/img-fond.png');
  background-size: cover;
  background-repeat: no-repeat;
}

.error {
  color: red;
}
</style>
