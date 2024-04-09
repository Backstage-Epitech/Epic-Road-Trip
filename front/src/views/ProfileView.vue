<script lang="ts">
import BanerComponent from "../components/BanerComponent.vue"

export default {
    data() {
        return {
            userConnected: {
                email: JSON.parse(localStorage.getItem("user") || "")["email"],
                userName: JSON.parse(localStorage.getItem("user") || "")["userName"],
                role: JSON.parse(localStorage.getItem("user") || "")["role"],
                image: JSON.parse(localStorage.getItem("user") || "")["image"]
            }
        }
    }
}
</script>

<template>
  <BanerComponent />

  <div class="d-flex flex-column justify-content-center align-items-center">
    <h2> Your profile</h2>

    <span><strong>Email : </strong>{{ userConnected.email }}</span>
    <span><strong>Username : </strong>{{ userConnected.userName }}</span>
    <span><strong>Role : </strong>{{ userConnected.role }}</span>
    
    <span><strong>Photo de profil : </strong></span>
    <img :src="userConnected.image" />
  </div>
</template>

<style scoped>
h2 {
    font-family: Trebuchet MS, sans-serif;
    font-weight: bold;
}

span {
    padding: 1%;
}
</style>
