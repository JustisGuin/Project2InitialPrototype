<template>
  <div class="login-wrapper">
    <div class="login-card">
      <img src="/public/minnetrista_logo.jpg" alt="Minnetrista Logo" class="login-logo" />
      <h2 class="login-title">Oakhurst Admin Login</h2>

      <label for="employeeId">Employee ID</label>
      <input id="employeeId" v-model="employeeId" type="text" class="login-input" />

      <label for="password">Password</label>
      <input id="password" v-model="password" type="password" class="login-input" />

      <button @click="login" class="login-button">Sign In</button>

      <p class="forgot-password">Forgot Password?</p>
      <p v-if="error" class="error-text">{{ error }}</p>
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

<style scoped>
.login-wrapper {
  min-height: 100vh;
  background: linear-gradient(to right, #cbd5e1, #e2e8f0);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.5rem;
}

.login-card {
  background-color: white;
  padding: 2rem;
  border-radius: 1.5rem;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
  transition: all 0.3s ease;
  text-align: center;
}

.login-logo {
  width: 100px;
  height: auto;
  margin-bottom: 1rem;
}

.login-title {
  font-size: 1.75rem;
  font-weight: bold;
  margin-bottom: 1.5rem;
  color: #1e293b;
}

.login-input {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #cbd5e1;
  border-radius: 0.5rem;
  margin-bottom: 1rem;
  transition: border 0.2s ease-in-out;
  font-size: 1rem;
}

.login-input:focus {
  outline: none;
  border-color: #3b82f6;
}

.login-button {
  width: 100%;
  background-color: #b042ff;
  color: white;
  padding: 0.75rem;
  font-size: 1rem;
  font-weight: 500;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
}

/* .login-button:hover {
  background-color: #;
} */

.forgot-password {
  color: #3b82f6;
  margin-top: 0.75rem;
  font-size: 0.875rem;
  cursor: pointer;
}

.error-text {
  color: #dc2626;
  text-align: center;
  margin-top: 1rem;
  font-size: 0.9rem;
}
</style>
