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
                <p class="number-stat">3</p>
                <p class="desc-stat">Voyages</p>
              </div>
              <div class="stat col-xs-4">
                <p class="number-stat">5</p>
                <p class="desc-stat">Favoris</p>
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

interface User {
  id: string
  email: string
  userName: string
  role: string
  image: string
}

const userConnected: User = {
  id: JSON.parse(localStorage.getItem('user') || '')['id'],
  email: JSON.parse(localStorage.getItem('user') || '')['email'],
  userName: JSON.parse(localStorage.getItem('user') || '')['userName'],
  role: JSON.parse(localStorage.getItem('user') || '')['role'],
  image: JSON.parse(localStorage.getItem('user') || '')['image']
}

//http://localhost:8081/api/favorite/2
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
