<template>
    <div class="min-h-screen bg-gray-100 p-6">
      <div class="max-w-2xl mx-auto bg-white rounded-2xl shadow p-6">
        <h1 class="text-2xl font-bold mb-4 text-center">Oakhurst Admin Audio Control</h1>
        <div v-for="room in rooms" :key="room.id" class="mb-4 border-b pb-4">
          <h2 class="text-xl font-semibold">{{ room.name }}</h2>
          <p class="text-gray-700 mb-2">Status: <span :class="room.audioOn ? 'text-green-600' : 'text-red-600'">{{ room.audioOn ? 'Audio ON' : 'Audio OFF' }}</span></p>
          <button
            class="px-4 py-2 rounded-lg text-white"
            :class="room.audioOn ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'"
            @click="toggleAudio(room.id)"
          >
            {{ room.audioOn ? 'Turn Off Audio' : 'Turn On Audio' }}
          </button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { reactive } from 'vue'
  
  const rooms = reactive([
    { id: 1, name: 'Main Room', audioOn: false },
    { id: 2, name: 'Planting the Seed Room', audioOn: true },
    { id: 3, name: 'Setting Roots', audioOn: false },
    { id: 4, name: 'Growing Branches', audioOn: true },
  ])
  
  function toggleAudio(id) {
    const room = rooms.find(r => r.id === id)
    if (room) room.audioOn = !room.audioOn
  }
  </script>
  
  <style scoped>
  body {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  }
  </style>
  