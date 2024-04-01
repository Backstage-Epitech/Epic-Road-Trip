<script setup lang="ts">
import ServiceBoxComponent from '../components/ServiceBoxComponent.vue'
import axios from 'axios';
import { ref } from 'vue';

const email = ref('');
const password = ref('');
const error = ref('');

async function loginUser() {
  const formData = {
    email: email.value,
    password: password.value
  };

  try {
    const response = await axios.post('http://localhost:8081/login', formData);
    console.log(response); // Affiche la réponse dans la console

    if (response.data.token) {
      alert('Vous êtes connecté'); // Si la réponse contient un jeton d'authentification, l'authentification est réussie
    } else {
      error.value = 'Identifiants incorrects';
    }
  } catch (error) {
    console.error('Une erreur s\'est produite lors de la connexion :', error);
    error.value = 'Une erreur s\'est produite lors de la connexion';
  }
}
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

          <v-form @submit.prevent="loginUser">
            <v-text-field
              v-model="email"
              label="Email"
              type="email"
              required
              outlined
              dense
              clearable
            ></v-text-field>
            <v-text-field
              v-model="password"
              label="password"
              type="password"
              required
              outlined
              dense
              clearable
            ></v-text-field>
            <v-container>
              <v-row class="space-between">
                <!-- <v-col>
                  <a href="">S'enregister</a>
                </v-col> -->
                <v-col>
                  <a href="">Mot de passe perdu</a>
                </v-col>
              </v-row>
            </v-container>
            <v-btn class="mt-2" text="Se connecter" type="submit" block></v-btn>
            <p v-if="error" class="error">{{ error }}</p>
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

.error {
  color: red;
}
</style>
