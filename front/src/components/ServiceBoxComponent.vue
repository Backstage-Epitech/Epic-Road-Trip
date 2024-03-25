<template>
  <div class="myBox">
    <p class="slogan bona-nova-regular-italic">Explorez le monde, sans casser votre tirelire.</p>
    <v-card class="u-about">
      <div class="d-flex blue-lagon">
        <div class="card-desc">
          <span class="material-symbols-outlined mx-3"> explore </span>
          <div>
            <p class="font-weight-bold text-decoration-underline">
              {{ 'Découverte' }}
            </p>
            <p class="text-medium-emphasis text-caption">
              {{ 'Explorez des destinations uniques.' }}
            </p>
          </div>
        </div>
        <div class="card-desc">
          <span class="material-symbols-outlined mx-3"> trip </span>
          <div>
            <p class="font-weight-bold text-decoration-underline">{{ 'Personnalisation' }}</p>
            <p class="text-medium-emphasis text-caption">
              {{ 'Créez des itinéraires adaptés à vos besoins.' }}
            </p>
          </div>
        </div>
        <div class="card-desc">
          <span class="material-symbols-outlined mx-3"> savings </span>
          <div>
            <p class="font-weight-bold text-decoration-underline">{{ 'Budget' }}</p>
            <p class="text-medium-emphasis text-caption">
              {{ 'Organisez votre voyage en fonction de votre budget.' }}
            </p>
          </div>
        </div>
        <div class="card-desc">
          <span class="material-symbols-outlined mx-3"> diversity_1 </span>
          <div>
            <p class="font-weight-bold text-decoration-underline">{{ 'Partage' }}</p>
            <p class="text-medium-emphasis text-caption">
              {{ 'Partagez vos aventures avec vos proches.' }}
            </p>
          </div>
        </div>
      </div>
    </v-card>
  </div>
</template>

<script setup lang="ts">
</script>

<style scoped>
.card-desc {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.5em;
}
.myBox {
  background-position: 40%;
}
</style>
