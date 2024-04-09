<script setup lang="ts">
import ServiceBoxComponent from '../components/ServiceBoxComponent.vue'
import PolaroidComponent from '../components/PolaroidGaleryComponent.vue'
import HomeSearch from '../components/HomeSearch.vue'
</script>

<template>
  <ServiceBoxComponent />
  <v-container class="ma-9 mx-auto section-one">
    <p class="text-h5 mb-4 text-center title blue-lagon">Découvrez l'évasion sur mesure</p>
    <p class="text-body-1 text-center">
      Que vous soyez un explorateur chevronné ou un aventurier novice, notre site est conçu pour
      vous aider à créer des souvenirs inoubliables. Faites des activités palpitantes, détendez-vous
      dans des hébergements confortables et découvrez des destinations exotiques, le tout sans
      dépasser votre budget. Du sommet des montagnes aux plages ensoleillés, en passant par les
      ruelles animées des villes, laissez-nous vous guider pour profiter de vos vacances! <br />
      Avec des fonctionnalités intuitives et des recommandations personnalisées, vous pouvez dire
      adieu au stress de la planification et dire bonjour à l'excitation de l'aventure.
      Préparez-vous à vivre des moments magiques et à explorer des contrées lointaines, le tout en
      un seul clic !
    </p>
    <HomeSearch />
  </v-container>

  <v-divider class="mt-4"></v-divider>

  <PolaroidComponent class="mb-6" />

</template>

<style scoped>
.title{
    font-family: 'Bona Nova', serif;
    font-style: italic;
    font-weight: bold;
}

</style>
