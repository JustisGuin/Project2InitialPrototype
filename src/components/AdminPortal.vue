<template>
  <div class="admin-wrapper">
    <!-- Section 1: Room Audio Controls -->
    <section class="section">
      <h2 class="section-title">Room Audio Control</h2>
      <div class="room-list">
        <div v-for="room in rooms" :key="room.id" class="room-card">
          <h3>{{ room.name }}</h3>
          <button
            @click="toggleAudio(room.id)"
            :class="room.audioOn ? 'room-button off' : 'room-button on'"
          >
            {{ room.audioOn ? 'Turn Off Audio' : 'Turn On Audio' }}
          </button>
        </div>
      </div>
    </section>

    <!-- Section 2: Family Travels Management -->
    <section class="section">
      <h2 class="section-title">Family Member Travels</h2>
      <div class="travel-management">
        <div class="family-edit">
          <h3>Edit Family Members</h3>
          <div v-for="(member, index) in familyMembers" :key="index" class="edit-item">
            <input v-model="member.name" class="edit-input" />
          </div>
        </div>

        <div class="country-edit">
          <h3>Edit Countries for Selected Member</h3>
          <ul>
            <li v-for="(country, index) in selectedMemberCountries" :key="index">
              <input v-model="selectedMemberCountries[index]" class="edit-input" />
            </li>
          </ul>
          <button @click="addCountry" class="add-country">Add Country</button>
        </div>

        <div class="map-section">
          <h3>Select a Ball Family Member to See Travels</h3>
          <div class="family-buttons">
            <button 
              v-for="(member, index) in familyMembers" 
              :key="index"
              @click="selectMember(member)"
              class="family-button"
            >
              {{ member.name }}
            </button>
          </div>
          <ClientOnly>
            <LMap style="height: 400px; width: 100%; border-radius: 1rem;" :zoom="2" :center="[20, 0]">
              <LTileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              <LMarker 
                v-for="(country, index) in selectedCoordinates" 
                :key="index" 
                :lat-lng="country.position"
              >
                <LPopup>{{ country.name }}</LPopup>
              </LMarker>
            </LMap>
          </ClientOnly>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { LMap, LTileLayer, LMarker, LPopup } from 'vue3-leaflet'
import 'leaflet/dist/leaflet.css'

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

const familyMembers = reactive([
  { name: 'Family Member 1' },
  { name: 'Family Member 2' },
  { name: 'Family Member 3' },
  { name: 'Family Member 4' },
  { name: 'Family Member 5' },
  { name: 'Family Member 6' },
])

const selectedMemberCountries = ref(['USA', 'France', 'Germany', 'Brazil'])

const selectedCoordinates = ref([
  { name: 'USA', position: [37.0902, -95.7129] },
  { name: 'France', position: [46.6034, 1.8883] },
  { name: 'Germany', position: [51.1657, 10.4515] },
  { name: 'Brazil', position: [-14.2350, -51.9253] },
])

function addCountry() {
  selectedMemberCountries.value.push('New Country')
}

function selectMember(member) {
  selectedCoordinates.value = [
    { name: 'USA', position: [37.0902, -95.7129] },
    { name: 'France', position: [46.6034, 1.8883] },
    { name: 'Germany', position: [51.1657, 10.4515] },
    { name: 'Brazil', position: [-14.2350, -51.9253] },
  ]
}
</script>

<style scoped>
.admin-wrapper {
  min-height: 100vh;
  background: #f9fafb;
  padding: 2rem;
}

.section {
  margin-bottom: 3rem;
}

.section-title {
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 1.5rem;
  color: #1e293b;
}

.room-list {
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
}

.room-card {
  background: #ffffff;
  padding: 1rem;
  border-radius: 0.75rem;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
  text-align: center;
}

.room-button {
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 0.5rem;
  font-weight: 600;
  cursor: pointer;
}

.room-button.on {
  background-color: #10b981;
  color: white;
}

.room-button.off {
  background-color: #ef4444;
  color: white;
}

.travel-management {
  display: grid;
  grid-template-columns: 1fr 1fr 2fr;
  gap: 2rem;
}

.edit-item {
  margin-bottom: 0.5rem;
}

.edit-input {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #d1d5db;
  border-radius: 0.5rem;
}

.add-country {
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  background: #3b82f6;
  color: white;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
}

.family-buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-bottom: 1rem;
}

.family-button {
  padding: 0.5rem 1rem;
  background: #e5e7eb;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  
}

.family-button:hover {
  background: #d1d5db;
}
</style>
