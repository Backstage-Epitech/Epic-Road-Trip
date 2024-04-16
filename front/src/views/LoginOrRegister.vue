<script>
import ServiceBoxComponent from '../components/ServiceBoxComponent.vue';
import EventBus from '../components/EventBus.js';
import axios from 'axios';
axios.defaults.baseURL = 'http://localhost:8081';

export default {
  data() {
    return {
      loginForm: {
        email: null,
        password: null
      },
      registerForm: {
        email: null,
        userName: null,
        password: null,
        role: 'User',
        image: null
      }
    }
  },
  methods: {
    async loginOrRegister(endpoint) {
      await axios.post('/api/' + endpoint, endpoint == "signup" ? this.registerForm : this.loginForm)
        .then(resp => {
          if (endpoint === 'login'){
            localStorage.setItem('user', JSON.stringify(resp.data.user))
            localStorage.setItem('token', JSON.stringify(resp.data.token))
            EventBus.emit("EVENT_USER_LOGIN", { msg: JSON.stringify(resp.data.user) });
            this.$router.push('/')
          } else if (endpoint === 'signup') {
            axios.post('/api/login', {email: this.registerForm.email, password: this.registerForm.password})
              .then(resp => {
                  localStorage.setItem('user', JSON.stringify(resp.data.user))
                  localStorage.setItem('token', JSON.stringify(resp.data.token))
                  EventBus.emit("EVENT_USER_LOGIN", { msg: JSON.stringify(resp.data.user) });
                  this.$router.push('/')
                }
              )
          }
        })
        .catch(err => {
          console.error('Error:', err);
          localStorage.removeItem('user')
        })
    },
    async handleImageChange(e) {
      const selectedImage = e.target.files[0];
      const reader = new FileReader();

      reader.onload = async (e) => {
        // Get the image data URL
        const imageDataUrl = e.target.result;

        // Create an image element
        const img = new Image();

        // Set the image source to the data URL
        img.src = imageDataUrl;

        // Wait for the image to load
        img.onload = () => {
          // Set the maximum width and height for the resized image
          const maxWidth = 600; // Set your desired maximum width
          const maxHeight = 400; // Set your desired maximum height

          // Calculate the new width and height to maintain aspect ratio
          let newWidth = img.width;
          let newHeight = img.height;

          if (newWidth > maxWidth) {
            const ratio = maxWidth / newWidth;
            newWidth = maxWidth;
            newHeight *= ratio;
          }

          if (newHeight > maxHeight) {
            const ratio = maxHeight / newHeight;
            newHeight = maxHeight;
            newWidth *= ratio;
          }

          // Create a canvas element
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');

          // Set the canvas dimensions to the new width and height
          canvas.width = newWidth;
          canvas.height = newHeight;

          // Draw the image onto the canvas with the new dimensions
          ctx.drawImage(img, 0, 0, newWidth, newHeight);

          // Get the resized image data URL
          const resizedImageDataUrl = canvas.toDataURL('image/jpeg'); // You can change the format if needed

          // Update your form with the resized image data URL
          this.registerForm.image = resizedImageDataUrl;
        };
      };

      // Read the selected image as a data URL
      reader.readAsDataURL(selectedImage);
    },
    anonymousRedirectHome() {
      this.$router.push('/home');
    }
  },
  computed: {
    currentEndpoint() {
      return this.$route.name;
    }
  }
}
</script>

<template>
  <ServiceBoxComponent />

  <v-container class="ma-9 mx-auto">
    <v-row>
      <v-col class="v-col-7 img-fond"> </v-col>
      <v-col class="mx-auto">
        <v-sheet class="mx-auto" max-width="300">
          <div class="d-flex flex-column justify-content-center align-items-center">
            <div class="d-flex flex-row justify-content-center align-items-center pb-4">
              <h2>{{ currentEndpoint != 'login' ? 'Register' : 'Login' }}</h2>
            </div>

            <form :class="{ 'd-none': currentEndpoint != 'login' }" @submit.prevent="loginOrRegister('login')">
              <div class="d-flex flex-column justify-content-center">
                <label>Email</label>
                <input v-model="loginForm.email" placeholder="email" />
                <label>Mot de passe</label>
                <input v-model="loginForm.password" placeholder="password" />

                <div class="d-flex flex-column align-items-center justify-content-center">
                  <div class="d-flex align-items-center justify-content-center">
                    <button class="sendButton" type="submit">Login</button>
                    <span class="separatingSpan">or</span>
                    <button @click="anonymousRedirectHome()" id="anonymousLoginButton">
                      <img src="../assets/images/anonymous-user.png">
                      Anonymous
                    </button>
                  </div>

                  <RouterLink class="dynamicLink" v-bind:to="currentEndpoint != 'login' ? '/login' : '/register'">
                    {{ currentEndpoint != 'login' ? 'Se connecter' : 'Créer un compte' }}
                  </RouterLink>
                </div>
              </div>
            </form>

            <form :class="{ 'd-none': currentEndpoint == 'login' }" @submit.prevent="loginOrRegister('signup')">
              <div class="d-flex flex-column justify-content-center">
                <label>Username</label>
                <input v-model="registerForm.userName" placeholder="username" />
                <label>Email</label>
                <input v-model="registerForm.email" placeholder="email" />
                <label>Password</label>
                <input v-model="registerForm.password" placeholder="password" />

                <label>Profile picture</label>
                <input type="file" @change="handleImageChange"/>

                <div class="d-flex flex-column align-items-center justify-content-center">
                  <button class="sendButton mb-4" type="submit">Register</button>

                  <RouterLink class="dynamicLink" v-bind:to="currentEndpoint != 'login' ? '/login' : '/register'">
                    {{ currentEndpoint != 'login' ? 'Ou se connecter' : 'Créer un compte' }}
                  </RouterLink>
                </div>
              </div>
            </form>
          </div>
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>
</template>

<style>
.separatingSpan {
  font-weight: 500;
  margin-right: 10px;
  margin-left: 10px;
}

#anonymousLoginButton {
  color: #0D100E;
  background-color: aliceblue;
  border-radius: 8px;
}

.dynamicLink {
  display: flex;
  align-items: center;
  color: #0D100E;
}

.sendButton {
  height: 37.2px;
  margin-bottom: 16px;
  color: aliceblue;
  border: 1px solid aliceblue;
  background-color: #0D100E;
  width: 130px;
  margin-top: 15px;
  border-radius: 8px;
}

.sendButton:hover {
  background-color: #353936;
}

.img-fond {
  background-image: url('../assets/images/img-fond.png');
  background-size: cover;
  background-repeat: no-repeat;
}

.error {
  color: red;
}
</style>
