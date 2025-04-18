<template>
  <Navbar @navigate="handleNavigation" />

  <div class="admin-wrapper">
    <div v-if="activeSection === 'rooms'">
      <!-- Section: Room Audio Controls -->
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
    </div>

    <div v-else-if="activeSection === 'family'">
      <!-- Section: Family Travels Management -->
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
              <component :is="LMap" v-if="LMap"
                style="height: 400px; width: 100%; border-radius: 1rem;"
                :zoom="2"
                :center="[20, 0]"
              >
                <component :is="LTileLayer" v-if="LTileLayer"
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <component
                  v-for="(country, index) in selectedCoordinates"
                  :key="index"
                  :is="LMarker"
                  :lat-lng="country.position"
                >
                  <component :is="LPopup">{{ country.name }}</component>
                </component>
              </component>
            </ClientOnly>

          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import Navbar from './Navbar.vue'
import 'leaflet/dist/leaflet.css'

const activeSection = ref('rooms')

let LMap = null
let LTileLayer = null
let LMarker = null
let LPopup = null

onMounted(async () => {
  const leaflet = await import('vue3-leaflet')
  LMap = leaflet.LMap
  LTileLayer = leaflet.LTileLayer
  LMarker = leaflet.LMarker
  LPopup = leaflet.LPopup
})

function handleNavigation(section) {
  activeSection.value = section
}

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

<style>
/* Reset the base styles to match login page font and smoothness */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Inter', 'Segoe UI', 'Roboto', 'Helvetica Neue', sans-serif;
  background-color: #f1f5f9;
  color: #1e293b;
}

/* Admin wrapper */
.admin-wrapper {
  min-height: 100vh;
  padding: 2rem;
  background-color: #f1f5f9;
}

/* Section general */
.section {
  background: #ffffff;
  padding: 2rem;
  border-radius: 1rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  margin-bottom: 3rem;
}

/* Section titles */
.section-title {
  font-size: 2rem;
  font-weight: bold;
  color: #1e293b;
  margin-bottom: 1.5rem;
}

/* Room cards */
.room-list {
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
}

.room-card {
  flex: 1 1 250px;
  background: white;
  border: 1px solid #e2e8f0;
  padding: 1.5rem;
  border-radius: 1rem;
  text-align: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.room-card h3 {
  font-size: 1.25rem;
  margin-bottom: 1rem;
}

/* Room buttons */
.room-button {
  margin-top: 1rem;
  padding: 0.5rem 1.5rem;
  font-weight: 600;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  font-size: 1rem;
  
}

.room-button.on {
  background-color: #10b981;
  color: white;
}

.room-button.off {
  background-color: #ef4444;
  color: white;
}

.room-button:hover {
  opacity: 0.9;
}

/* Travel management section */
.travel-management {
  display: grid;
  grid-template-columns: 1fr 1fr 2fr;
  gap: 2rem;
}

/* Family editing */
.family-edit, .country-edit {
  background: #f9fafb;
  padding: 1rem;
  border-radius: 1rem;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.04);
}

/* Inputs */
.edit-item, .edit-input {
  margin-bottom: 1rem;
}

.edit-input {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #cbd5e1;
  border-radius: 0.5rem;
  font-size: 1rem;
}

.edit-input:focus {
  outline: none;
  border-color: #3b82f6;
}

/* Add Country button */
.add-country {
  margin-top: 1rem;
  padding: 0.75rem 1.5rem;
  background-color: #6366f1;
  color: white;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: background 0.2s;
}

.add-country:hover {
  background-color: #4f46e5;
}

/* Family member buttons */
.family-buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.family-button {
  background: #e5e7eb;
  padding: 0.75rem 1.5rem;
  border-radius: 0.75rem;
  border: none;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s;
}

.family-button:hover {
  background: #d1d5db;
}

/* Map Section */
.map-section {
  background: white;
  padding: 2rem;
  border-radius: 1rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
}

.map-section h3 {
  margin-bottom: 1.5rem;
  font-size: 1.5rem;
}

/* Make map responsive */
.leaflet-container {
  height: 400px;
  width: 100%;
  border-radius: 1rem;
}

</style>
