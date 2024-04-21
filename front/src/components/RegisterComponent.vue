<script lang="ts" setup>
import router from '@/router'
import axios from 'axios'
import { ref } from 'vue'
import EventBus from './EventBus'

axios.defaults.baseURL = 'http://localhost:8081'

interface RegisterForm {
  email: string
  password: string
  userName: string
  role: string
  image: string
}

const email = ref('')
const password = ref('')
const userName = ref('')
const image = ref('')

const register = async () => {
  const formData: RegisterForm = {
    email: email.value,
    password: password.value,
    userName: userName.value,
    role: 'User',
    image: image.value
  }
  await axios
    .post('/api/signup', formData)
    .then(() => {
      axios.post('/api/login', { email: email.value, password: password.value }).then((resp) => {
        localStorage.setItem('user', JSON.stringify(resp.data.user))
        localStorage.setItem('token', JSON.stringify(resp.data.token))
        EventBus.emit('EVENT_USER_LOGIN', { msg: JSON.stringify(resp.data.user) })
        router.push('/')
      })
    })
    .catch((err) => {
      console.error('Error:', err)
      localStorage.removeItem('user')
    })
}

const handleImageChange = async (event: Event) => {
  const selectedImage = (event.target as HTMLInputElement).files?.[0]
  const reader = new FileReader()

  reader.onload = async (event) => {
    // Get the image data URL
    const imageDataUrl = event.target?.result?.toString()
    console.log({ target: event.target })

    // Create an image element
    const img = new Image()
    // Set the image source to the data URL
    img.src = imageDataUrl ?? ''

    // Wait for the image to load
    img.onload = () => {
      // Set the maximum width and height for the resized image
      const maxWidth = 600 // Set your desired maximum width
      const maxHeight = 400 // Set your desired maximum height

      // Calculate the new width and height to maintain aspect ratio
      let newWidth = img.width
      let newHeight = img.height

      if (newWidth > maxWidth) {
        const ratio = maxWidth / newWidth
        newWidth = maxWidth
        newHeight *= ratio
      }

      if (newHeight > maxHeight) {
        const ratio = maxHeight / newHeight
        newHeight = maxHeight
        newWidth *= ratio
      }

      // Create a canvas element
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')

      // Set the canvas dimensions to the new width and height
      canvas.width = newWidth
      canvas.height = newHeight

      // Draw the image onto the canvas with the new dimensions
      ctx?.drawImage(img, 0, 0, newWidth, newHeight)

      // Get the resized image data URL
      const resizedImageDataUrl = canvas.toDataURL('image/jpeg') // You can change the format if needed

      // Update your form with the resized image data URL
      image.value = resizedImageDataUrl
    }
  }

  // Read the selected image as a data URL
  selectedImage && reader.readAsDataURL(selectedImage)
}
</script>

<template>
  <div class="d-flex flex-column justify-content-center align-items-center">
    <v-col class="my-15 mx-auto" cols="12" md="5">
      <v-form @submit.prevent="register">
        <fieldset class="d-flex flex-column justify-content-center">
          <legend class="d-flex flex-row justify-content-center align-items-center pb-4">
            <h3 class="text-center font-weight-bold">Formulaire d'inscription</h3>
          </legend>
          <v-text-field
            v-model="userName"
            label="Username"
            type="text"
            required
            outlined
            dense
            clearable
          />
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
            label="Password"
            type="password"
            required
            outlined
            dense
            clearable
          />
          <label class="label-img" for="register-form.image">Photo de profile</label>
          <div class="custom-file-upload">
            <input
              id="register-form.image"
              type="file"
              accept="image/*"
              @change="handleImageChange"
            />
          </div>

          <div class="d-flex flex-column align-items-center justify-content-center">
            <v-col cols="auto">
              <v-btn color="light-green-darken-2" type="submit">S'inscrire</v-btn>
            </v-col>
          </div>
        </fieldset>
      </v-form>
    </v-col>
  </div>
</template>

<style scoped>
.separatingSpan {
  font-weight: 500;
  margin-right: 10px;
  margin-left: 10px;
}

#anonymousLoginButton {
  color: #0d100e;
  background-color: aliceblue;
  border-radius: 8px;
}

.dynamicLink {
  display: flex;
  align-items: center;
  color: #0d100e;
}

</style>
