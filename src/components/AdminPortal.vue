<template>
  <div class="admin-wrapper">
    <div class="admin-card">
      <h1 class="admin-title">Oakhurst Admin Audio Control</h1>
      <div v-for="room in rooms" :key="room.id" class="room-card">
        <div class="room-header">
          <h2 class="room-name">{{ room.name }}</h2>
          <span :class="['room-status', room.audioOn ? 'on' : 'off']">
            {{ room.audioOn ? 'Audio ON' : 'Audio OFF' }}
          </span>
        </div>
        <button
          class="toggle-button"
          :class="room.audioOn ? 'off-btn' : 'on-btn'"
          @click="toggleAudio(room.id)"
        >
          {{ room.audioOn ? 'Turn Off Audio' : 'Turn On Audio' }}
        </button>
      </div>
      <RouterLink to="/">
      <button class="toggle-button">Log Out</button>
    </RouterLink>
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import { RouterLink } from 'vue-router'

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
.admin-wrapper {
  min-height: 100vh;
  background: #f3f4f6;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: 2rem;
}

.admin-card {
  background: white;
  width: 100%;
  max-width: 700px;
  padding: 2rem;
  border-radius: 1.5rem;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
}

.admin-title {
  font-size: 2rem;
  font-weight: bold;
  text-align: center;
  margin-bottom: 2rem;
  color: #1e293b;
}

.room-card {
  background-color: #f9fafb;
  border: 1px solid #e2e8f0;
  border-radius: 1rem;
  padding: 1.25rem;
  margin-bottom: 1.25rem;
  transition: all 0.2s ease-in-out;
}

.room-card:hover {
  background-color: #f1f5f9;
  transform: scale(1.01);
}

.room-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.room-name {
  font-size: 1.25rem;
  font-weight: 600;
  color: #111827;
}

.room-status {
  font-size: 0.95rem;
  font-weight: 500;
  padding: 0.35rem 0.75rem;
  border-radius: 999px;
  background-color: #e5e7eb;
  color: #4b5563;
}

.room-status.on {
  background-color: #d1fae5;
  color: #065f46;
}

.room-status.off {
  background-color: #fee2e2;
  color: #991b1b;
}

.toggle-button {
  width: 100%;
  padding: 0.75rem;
  font-size: 1rem;
  font-weight: 600;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;

}

.toggle-button.on-btn {
  background-color: #10b981;
  color: white;
}

.toggle-button.on-btn:hover {
  background-color: #059669;
}

.toggle-button.off-btn {
  background-color: #ef4444;
  color: white;
}

.toggle-button.off-btn:hover {
  background-color: #dc2626;
}
</style>
