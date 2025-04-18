<template>
    <nav class="navbar">
      <div class="nav-links">
        <button class="nav-link" @click="$emit('navigate', 'rooms')">Room Audio Control</button>
        <button class="nav-link" @click="$emit('navigate', 'family')">Family Travels Management</button>
        <router-link to="/" class="nav-link">Logout</router-link>
      </div>
    </nav>
  </template>
  
  <script setup>
  </script>
  
  <style scoped>
  .navbar {
    width: 100%;
    background: #1e293b;
    padding: 1rem 2rem;
    display: flex;
    justify-content: center;
  }
  
  .nav-links {
    display: flex;
    gap: 2rem;
  }
  
  .nav-link {
    background: none;
    border: none;
    color: white;
    font-weight: 600;
    font-size: 1rem;
    cursor: pointer;
    text-decoration: none;
    transition: color 0.3s;
  }
  
  .nav-link:hover {
    color: #60a5fa;
  }
  </style>
  