<template>
    <div class="reservation-page">
      <h1>Page de vos voyages</h1>
      <template v-if="!reservationEffectuee">
        <p>Vous n'avez pas encore effectué de voyage.</p>
        <router-link to="/planification">
          <button>Planifier un voyage</button>
        </router-link>
      </template>
      <template v-else>
        <p>Merci d'avoir effectué votre réservation!</p>
      </template>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        reservationEffectuee: false 
      };
    }
  };
  </script>
  
  <style scoped>
  .reservation-page {
    text-align: center;
    margin-top: 20px;
  }
  </style>
  