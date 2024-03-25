<script setup lang="ts">
import ServiceBoxComponent from '../components/ServiceBoxComponent.vue'
</script>

<template>
  <ServiceBoxComponent />

  <v-container class="ma-9 mx-auto">
    <v-row>
      <v-col class="v-col-7 img-fond"> </v-col>
      <v-col class="my-12 mx-auto">
        <v-sheet class="mx-auto" max-width="300">
          <h3 class="mb-6 text-center font-weight-bold">Se connecter</h3>
          <v-divider></v-divider>

          <v-form validate-on="submit lazy" @submit.prevent="">
            <v-text-field label="Email"></v-text-field>
            <v-text-field label="Password"></v-text-field>
            <v-container>
              <v-row class="space-between">
                <v-col>
                  <a href="">S'enregister</a>
                </v-col>
                <v-col>
                  <a href="">Mot de passe perdu</a>
                </v-col>
              </v-row>
            </v-container>
            <v-btn class="mt-2" text="Submit" type="submit" block></v-btn>
          </v-form>
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.img-fond {
  background-image: url('../assets/images/img-fond.png');
  background-size: cover;
  background-repeat: no-repeat;
}
</style>
