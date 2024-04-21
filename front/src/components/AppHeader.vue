<script setup lang="ts">
import { ref, onMounted } from 'vue'

import EventBus from './EventBus'

const userIsConnected = ref(false)

const cleanLocalStorage = async () => {
  localStorage.removeItem('user')
  localStorage.removeItem('token')
  userIsConnected.value = false
}

onMounted(() => {
  EventBus.on('EVENT_USER_LOGIN', (data) => {
    const userLS = localStorage.getItem('user')
    if(userLS){
      userIsConnected.value = true
    }
  })
})
</script>

<template>
  <div class="v-container mx-auto d-flex align-center justify-center">
    <router-link
      to="/"
      class="v-btn v-theme--light v-btn--density-default v-btn--size-default v-btn--variant-text"
    >
      <span class="v-btn__overlay"></span>
      <span class="v-btn__underlay"></span>
      <span class="v-btn__content">Accueil</span>
    </router-link>
    <router-link
      to="/planification"
      class="v-btn v-theme--light v-btn--density-default v-btn--size-default v-btn--variant-text"
    >
      <span class="v-btn__overlay"></span>
      <span class="v-btn__underlay"></span>
      <span class="v-btn__content">Planification</span>
    </router-link>
    <router-link
      to="/reservations"
      class="v-btn v-theme--light v-btn--density-default v-btn--size-default v-btn--variant-text"
    >
      <span class="v-btn__overlay"></span>
      <span class="v-btn__underlay"></span>
      <span class="v-btn__content">Mes voyages</span>
    </router-link>
    <router-link
      to="/histo"
      class="v-btn v-theme--light v-btn--density-default v-btn--size-default v-btn--variant-text"
    >
      <span class="v-btn__overlay"></span>
      <span class="v-btn__underlay"></span>
      <span class="v-btn__content">Historique</span>
    </router-link>
    <div class="v-spacer"></div>
    <router-link
      v-if="userIsConnected"
      to="/profile"
      class="v-btn v-theme--light v-btn--density-default v-btn--size-default v-btn--variant-text"
    >
      <span class="v-btn__overlay"></span>
      <span class="v-btn__underlay"></span>
      <span class="v-btn__content">Profil</span>
    </router-link>
    <router-link
      to="/login"
      class="ms-4 v-btn v-theme--light v-btn--density-default v-btn--size-default v-btn--variant-text"
    >
      <span class="v-btn__overlay"></span>
      <span class="v-btn__underlay"></span>
      <span class="v-btn__content" @click="cleanLocalStorage">{{
        userIsConnected ? 'Se déconnecter' : 'Se connecter'
      }}</span>
    </router-link>
  </div>
</template>

<style scoped>
.link-style {
  color: black;
  text-decoration: none;
}
</style>
