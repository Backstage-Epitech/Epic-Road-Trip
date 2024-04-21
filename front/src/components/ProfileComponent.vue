<template>
  <v-container class="mx-auto">
    <v-row class="flex-child text-subtitle-2">
      <v-col class="my-15 mx-auto" cols="12" md="6">
        <v-sheet class="mx-auto">
          <div class="left-box col-lg-5">
            <div class="photo-left">
              <img alt="profile" class="photo" :src="userConnected.image ? userConnected.image : 'https://picsum.photos/200/300'" />
              <div class="active"></div>
            </div>
            <h4 class="name">{{ userConnected.userName }}</h4>
            <p class="info">{{ userConnected.role }}</p>
            <p class="info">{{ userConnected.email }}</p>
            <div class="stats row">
              <div class="stat col-xs-4">
                <p class="number-stat">{{ userConnected.voyages.length }}</p>
                <p class="desc-stat">Voyages</p>
              </div>
              <div class="stat col-xs-4">
                <p class="number-stat">{{ userConnected.favoris.length }}</p>
                <p class="desc-stat">Favoris</p>
              </div>
            </div>
            <span><strong>Favoris</strong></span>
            <div class="stats row">
              <div class="stat col-xs-4">
                <li v-for="favori in userConnected.favoris" :key="favori.favorite.id">
                  {{ favori.favorite }}
                </li>
              </div>
            </div>
          </div>
        </v-sheet>
      </v-col>
      <v-col class="my-15 mx-auto" cols="12" md="6">
        <v-row class="ma-n3">
          <v-col cols="12"> </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>
<script setup lang="ts">
import { onMounted } from 'vue'
import axios from 'axios'
axios.defaults.baseURL = 'http://localhost:8081'

interface User {
  id: string
  email: string
  userName: string
  role: string
  image: string,
  voyages: Voyage[],
  favoris: Favori[]
}

interface Favori {
  message: string,
	favorite: {
		id: number,
		favorite: string,
		user_id: number,
		updatedAt: string,
		createdAt: string
	}
}

interface Voyage {}

const userConnected: User = {
  id: JSON.parse(localStorage.getItem('user') || '')['id'],
  email: JSON.parse(localStorage.getItem('user') || '')['email'],
  userName: JSON.parse(localStorage.getItem('user') || '')['userName'],
  role: JSON.parse(localStorage.getItem('user') || '')['role'],
  image: JSON.parse(localStorage.getItem('user') || '')['image'],
  voyages: [],
  favoris: []
}

onMounted(async () => {
  await axios.get('/api/favorite/'+userConnected.id)
  .then((resp) => {
    console.log(resp)
    userConnected.favoris = resp.data.favoriteList;
  })
})

</script>
<style scoped>
h2 {
  font-family:
    Trebuchet MS,
    sans-serif;
  font-weight: bold;
}

span {
  padding: 1%;
}

.photo {
  width: 200px;
  height: 200px;
  margin-top: -120px;
  border-radius: 100px;
  border: 4px solid #fff;
  object-fit: cover;
}

.name {
  margin-top: 20px;
  font-family: 'Montserrat', sans-serif;
  font-weight: 600;
  font-size: 2em;
  color: #555151;
}

.info {
  margin-top: -5px;
  margin-bottom: 5px;
  font-family: 'Montserrat', sans-serif;
  font-size: 1.1em;
  color: #555151;
}

.left-box {
  text-align-last: center;
}

.stats {
  margin-top: 25px;
  text-align: center;
  padding-bottom: 20px;
  border-bottom: 1px solid #ededed;
  font-family: 'Montserrat', sans-serif;
}

.number-stat {
  padding: 0px;
  font-size: 14pt;
  font-weight: bold;
  font-family: 'Montserrat', sans-serif;
  color: #555151;
}

.desc-stat {
  margin-top: -15px;
  font-size: 10pt;
  color: #555151;
}

.stats.row {
  justify-content: space-around;
}
</style>
