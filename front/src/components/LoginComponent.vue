<script lang="ts" setup>
//import EventBus from '../components/EventBus.js'

import router from '@/router'
import axios from 'axios'
import { ref } from 'vue'
import EventBus from './EventBus.js'

const email = ref('')
const password = ref('')
const errorMessage = ref('')

interface User {
  email: string
  password: string
}

const loginUser = async () => {
  try {
    const formData: User = { email: email.value, password: password.value }
    const response = await axios.post('http://localhost:8081/login', formData)

    if (response.data.token) {
      console.log(response.data)
      // Si la réponse contient un jeton d'authentification, l'authentification est réussie
      localStorage.setItem('user', JSON.stringify(response.data.user))
      localStorage.setItem('token', JSON.stringify(response.data.token))
      EventBus.emit('EVENT_USER_LOGIN', { msg: JSON.stringify(response.data.user) })
      router.push('/')
    } else {
      errorMessage.value = 'Identifiants incorrects'
    }
  } catch (error) {
    console.error("Une erreur s'est produite lors de la connexion :", 401)
    errorMessage.value = 'Identifiants incorrects'
  }
}
</script>

<template>
  <v-container class="mx-auto">
    <v-row class="flex-child text-subtitle-2">
      <v-col class="my-15 mx-auto" cols="12" md="6">
        <v-sheet class="mx-auto">
          <h3 class="text-center font-weight-bold">Se connecter</h3>
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
            />
            <v-text-field
              v-model="password"
              label="password"
              type="password"
              required
              outlined
              dense
              clearable
            />
            <v-alert v-if="errorMessage" type="warning" variant="outlined" prominent>
              {{ errorMessage }}
            </v-alert>
            <v-container>
              <v-row class="space-between">
                <v-col>
                  <a href="">Mot de passe perdu</a>
                </v-col>
              </v-row>
            </v-container>
            <div class="d-flex flex-column align-items-center justify-content-center">
              <v-col cols="auto">
                <v-btn color="light-green-darken-2" type="submit">Connection</v-btn>
              </v-col>
            </div>
          </v-form>
        </v-sheet>
      </v-col>
      <v-col class="my-15 mx-auto" cols="12" md="6">
        <v-row class="ma-n3">
          <v-col cols="12">
            <h3 class="text-center font-weight-bold">Google Auth</h3>
            <v-divider></v-divider>
            Module de connection a creer
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>
