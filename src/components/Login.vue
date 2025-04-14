<template>
  <div class="min-h-screen bg-blue-100 flex items-center justify-center">
    <div class="bg-white p-8 rounded-2xl shadow-md w-full max-w-md">
      <h2 class="text-2xl font-bold mb-6 text-center">Oakhurst Admin Login</h2>
      <div class="mb-4">
        <label for="employeeId" class="block text-gray-700 mb-1">Employee ID</label>
        <input id="employeeId" v-model="employeeId" type="text" class="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" />
      </div>
      <div class="mb-4">
        <label for="password" class="block text-gray-700 mb-1">Password</label>
        <input id="password" v-model="password" type="password" class="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" />
      </div>
      <button @click="login" class="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">Sign In</button>
      <p class="text-sm text-center mt-3 text-blue-500 cursor-pointer">Forgot Password?</p>
      <p v-if="error" class="mt-4 text-red-600 text-center">{{ error }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const employeeId = ref('')
const password = ref('')
const error = ref('')
const router = useRouter()

function login() {
  if (employeeId.value === 'admin' && password.value === 'oakhurst') {
    router.push('/dashboard')
  } else {
    error.value = 'Invalid credentials. Please try again.'
  }
}
</script>
