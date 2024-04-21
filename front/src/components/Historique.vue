<template>
    <div class="historique-page">
      <h1>Historique des réservations</h1>
      <template v-if="reservations.length === 0">
        <p>Vous n'avez pas encore d'historique de réservations.</p>
      </template>
      <template v-else>
        <ul>
          <li v-for="(reservation, index) in reservations" :key="index">
            {{ reservation }}
          </li>
        </ul>
      </template>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        reservations: [] 
      };
    }
  };
  </script>
  
  <style scoped>
  .historique-page {
    text-align: center;
    margin-top: 20px;
  }
  </style>
  