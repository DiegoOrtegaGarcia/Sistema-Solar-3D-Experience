<script setup lang="ts">
  import { ref } from 'vue'
  import { usePLanetModal } from '@/hooks/usePlanetModal'
  import PlanetRender from './planetRender.vue'

  const props = defineProps<{
    planetId: number | null
  }>()
  const emit = defineEmits(['close'])
  const showModal = ref(false)

  const { currentPlanet, closeModal, handleKeyDown, formatValue } = usePLanetModal(emit, props, showModal)

</script>

<template>
  <v-dialog
    v-model="showModal"
    class="planet-modal"
    fullscreen
    scrim="black"
    transition="dialog-bottom-transition"
    @keydown="handleKeyDown"
  >
    <v-card class="modal-card">

      <div class="modal-content">
        <!-- Columna izquierda: Visualización 3D -->
        <div class="planet-viewer-container">
          <PlanetRender v-if="planetId" :id="planetId" />

          <v-btn
            class="close-btn"
            color="red"
            dark
            fab
            large
            @click="closeModal"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </div>

        <!-- Columna derecha: Información del planeta -->
        <div v-if="currentPlanet" class="planet-info-card">
          <v-card class="info-card elevation-12">
            <v-img
              class="planet-header-image"
              cover
              height="200"
              :src="currentPlanet.image"
            >
              <div class="planet-header">
                <h1 class="planet-name">{{ currentPlanet.name }}</h1>
                <h3 class="planet-type">{{ currentPlanet.type }}</h3>
              </div>
            </v-img>

            <v-card-text class="planet-description">
              <p>{{ currentPlanet.description }}</p>

              <v-divider class="my-4" />

              <h3 class="info-section-title">Características principales</h3>

              <v-row>
                <v-col cols="6">
                  <div class="info-item">
                    <v-icon class="info-icon">mdi-ruler</v-icon>
                    <div>
                      <div class="info-label">Diámetro</div>
                      <div class="info-value" v-html="formatValue(currentPlanet.diameter)" />
                    </div>
                  </div>
                </v-col>

                <v-col cols="6">
                  <div class="info-item">
                    <v-icon class="info-icon">mdi-weight</v-icon>
                    <div>
                      <div class="info-label">Masa</div>
                      <div class="info-value" v-html="formatValue(currentPlanet.mass)" />
                    </div>
                  </div>
                </v-col>

                <v-col cols="6">
                  <div class="info-item">
                    <v-icon class="info-icon">mdi-earth</v-icon>
                    <div>
                      <div class="info-label">Gravedad</div>
                      <div class="info-value">{{ currentPlanet.gravity }}</div>
                    </div>
                  </div>
                </v-col>

                <v-col cols="6">
                  <div class="info-item">
                    <v-icon class="info-icon">mdi-orbit</v-icon>
                    <div>
                      <div class="info-label">Periodo orbital</div>
                      <div class="info-value">{{ currentPlanet.orbitPeriod }}</div>
                    </div>
                  </div>
                </v-col>

                <v-col cols="6">
                  <div class="info-item">
                    <v-icon class="info-icon">mdi-rotate-right</v-icon>
                    <div>
                      <div class="info-label">Rotación</div>
                      <div class="info-value">{{ currentPlanet.rotationPeriod }}</div>
                    </div>
                  </div>
                </v-col>

                <v-col cols="6">
                  <div class="info-item">
                    <v-icon class="info-icon">mdi-thermometer</v-icon>
                    <div>
                      <div class="info-label">Temperatura</div>
                      <div class="info-value">{{ currentPlanet.temperatureRange }}</div>
                    </div>
                  </div>
                </v-col>
              </v-row>

              <v-divider class="my-4" />

              <h3 class="info-section-title">Atmósfera</h3>
              <p>{{ currentPlanet.atmosphere }}</p>

              <v-divider class="my-4" />

              <h3 class="info-section-title">Datos curiosos</h3>
              <ul class="curiosities-list">
                <li v-for="(curiosity, index) in currentPlanet.curiosities" :key="index">
                  {{ curiosity }}
                </li>
              </ul>

              <v-divider class="my-4" />

              <h3 class="info-section-title">Exploración</h3>
              <p>{{ currentPlanet.exploration }}</p>
            </v-card-text>
          </v-card>
        </div>
      </div>
    </v-card>
  </v-dialog>
</template>

<style scoped>
.modal-card {
  background: #000;
  overflow: hidden; /* Elimina scrollbars del modal */
}

.modal-content {
  display: flex;
  height: calc(100vh - 64px);
  overflow: hidden; /* Elimina scrollbars del contenedor principal */
}

.planet-viewer-container {
  flex: 1;
  position: relative;
  height: 100%;
  overflow: hidden; /* Elimina scrollbars del visor 3D */
}

.planet-info-card {
  width: 450px;
  height: 100%;
  padding: 20px;
  overflow-y:visible; /* Permite scroll vertical solo en el panel de info */
  overflow-x: hidden; /* Elimina scroll horizontal */
  background: rgba(10, 14, 23, 0.8);
}

.info-card {
  border-radius: 12px;
  overflow: hidden;
}

.planet-header-image {
  position: relative;
}

.planet-header {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 20px;
  background: linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 100%);
  color: white;
}

.planet-name {
  font-size: 2.2rem;
  font-weight: 700;
  margin-bottom: 5px;
  text-shadow: 0 2px 4px rgba(0,0,0,0.5);
}

.planet-type {
  font-size: 1.2rem;
  font-weight: 400;
  opacity: 0.9;
  text-shadow: 0 1px 2px rgba(0,0,0,0.5);
}

.planet-description {
  padding: 20px;
  font-size: 1rem;
  line-height: 1.6;
  color: #f3efef;
}

.info-section-title {
  font-size: 1.4rem;
  margin: 20px 0 15px;
  color: #0d2bd6;
  border-bottom: 2px solid #0f2edb;
  padding-bottom: 5px;
}

.info-item {
  display: flex;
  align-items: center;
  margin-bottom: 15px;
}

.info-icon {
  margin-right: 15px;
  font-size: 2rem;
  color: #1635e2;
}

.info-label {
  font-weight: 600;
  color: #ebe5e5;
  font-size: 0.9rem;
}

.info-value {
  font-size: 1.1rem;
  font-weight: 700;
  color: #afaaaa;
}

.curiosities-list {
  padding-left: 20px;
  margin-top: 10px;
}

.curiosities-list li {
  margin-bottom: 10px;
  line-height: 1.5;
}

.close-btn {
  position: absolute;
  top: 20px;
  left: 20px;
  z-index: 100;
  opacity: 0.7;
  transition: opacity 0.3s ease;
}

.close-btn:hover {
  opacity: 1;
  transform: scale(1.1);
}

/* Scrollbar personalizada */
.planet-info-card::-webkit-scrollbar {
  width: 8px;
}

.planet-info-card::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 4px;
}

.planet-info-card::-webkit-scrollbar-thumb {
  background: #3f51b5;
  border-radius: 4px;
}

/* Responsive */
@media (max-width: 1200px) {
  .modal-content {
    flex-direction: column;
  }

  .planet-info-card {
    width: 100%;
    height: 45%;
  }

  .planet-viewer-container {
    height: 55%;
  }
}

@media (max-width: 768px) {
  .planet-info-card {
    padding: 10px;
  }

  .planet-header {
    padding: 10px;
  }

  .planet-name {
    font-size: 1.8rem;
  }
}
</style>
