<template>
  <v-app>
    <v-main>
      <v-container class="pa-0" fluid>
        <section class="hero-section">
          <v-row align="center" class="fill-height ma-0" justify="center">
            <v-col class="text-center" cols="12" md="8">
              <h1 class="hero-title">Explora el Sistema Solar</h1>
              <p class="hero-subtitle">Un viaje interactivo en 3D por nuestro vecindario cósmico</p>
              <v-icon class="scroll-hint" large>mdi-chevron-double-down</v-icon>
            </v-col>
          </v-row>
        </section>

        <section class="info-section">
          <v-container>
            <v-row>
              <v-col class="d-flex align-center" cols="12" md="6">
                <div>
                  <h2 class="section-title">Descubre los planetas</h2>
                  <p class="section-text">
                    Nuestro sistema solar alberga una increíble variedad de mundos, desde el ardiente
                    Mercurio hasta los gélidos confines de Neptuno. Desplázate para comenzar la exploración.
                  </p>
                  <v-btn
                    class="mt-4"
                    color="primary"
                    large
                    rounded
                    @click="scrollToCanvas"
                  >
                    Comenzar viaje
                  </v-btn>
                </div>
              </v-col>
              <v-col cols="12" md="6">
                <v-img
                  alt="Sistema solar"
                  class="rounded-lg elevation-5"
                  contain
                  height="350"
                  src="https://images.unsplash.com/photo-1462331940025-496dfbfc7564?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                />
              </v-col>
            </v-row>
          </v-container>
        </section>

        <section ref="canvasSection" class="canvas-section">
          <v-container>
            <v-card class="canvas-card" elevation="12">
              <div class="canvas-wrapper">
                <ThreeJsComponent ref="threeJsComponent" />
              </div>
              <div class="canvas-overlay pa-4">
                <h3 class="overlay-title">Sistema Solar Interactivo</h3>
                <p class="overlay-text">Usa el ratón para rotar y hacer zoom en la escena</p>
              </div>
            </v-card>
          </v-container>
        </section>

        <section class="planets-section">
          <v-container>
            <h2 class="section-title text-center mb-8">Conoce los planetas</h2>
            <v-row>
              <v-col
                v-for="(planet, index) in planetsInfo"
                :key="index"
                cols="12"
                md="3"
                sm="6"
              >
                <v-card
                  class="planet-card"
                  elevation="3"
                  @click="openPlanetModal(index + 1)"
                >
                  <v-img
                    class="planet-image"
                    height="200"
                    :src="planet.image"
                  />
                  <v-card-title class="planet-name">{{ planet.name }}</v-card-title>
                  <v-card-text class="planet-desc">{{ planet.description }}</v-card-text>
                </v-card>
              </v-col>
            </v-row>
          </v-container>
        </section>

        <PlanetModal
          :planet-id="selectedPlanetId"
          :transition="modalTransition"
          @close="closePlanetModal"
        />
        <footer class="app-footer">
          <v-container>
            <v-row align="center" justify="center">
              <v-col class="text-center text-md-left" cols="12" md="6">
                <h3 class="footer-title">Sistema Solar 3D</h3>
                <p class="footer-text">Una experiencia educativa creada con Three.js y Vue.js</p>
              </v-col>
              <v-col class="text-center text-md-right" cols="12" md="6">
                <v-btn
                  v-for="(icon, i) in socialIcons"
                  :key="i"
                  class="mx-2"
                  :color="icon.color"
                  :href="icon.src"
                  icon
                  large
                >
                  <v-icon>{{ icon.name }}</v-icon>
                </v-btn>
              </v-col>
            </v-row>
            <div class="text-center mt-6">
              <p class="copyright">© 2025 Sistema Solar 3D. Todos los derechos reservados.</p>
            </div>
          </v-container>
        </footer>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
  import { ref } from 'vue'
  import { planetsInfo, socialIcons } from '@/Constants/constants'
  import { useHelloWorld } from '@/hooks/usehelloWorld'
  import threeJsComponent from './threeJsComponent.vue'

  const canvasSection = ref(null)
  const { scrollToCanvas, openPlanetModal, closePlanetModal, selectedPlanetId, modalTransition } = useHelloWorld(canvasSection)

</script>

<style scoped>
:root {
  --primary-color: #3f51b5;
  --secondary-color: #ff4081;
  --dark-color: #1a237e;
  --light-color: #e8eaf6;
}

.hero-section {
  height: 100vh;
  background: linear-gradient(135deg, var(--dark-color) 0%, #4a148c 100%);
  color: white;
  position: relative;
  overflow: hidden;
}

.hero-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: url('https://images.unsplash.com/photo-1462331940025-496dfbfc7564?ixlib=rb-1.2.1&auto=format&fit=crop&w=1600&q=80') no-repeat center center;
  background-size: cover;
  opacity: 0.2;
}

.hero-title {
  font-size: 4rem;
  font-weight: 700;
  margin-bottom: 1rem;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
  animation: fadeInUp 1s ease-out;
}

.hero-subtitle {
  font-size: 1.5rem;
  margin-bottom: 2rem;
  opacity: 0;
  animation: fadeInUp 1s ease-out 0.3s forwards;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
}

.info-section {
  padding: 80px 0;
  background-color: white;
}
.canvas-section {
  padding: 20px 0;
  background-color: #f5f7ff;
}

.canvas-card {
  position: relative;
  height: 75vh;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.canvas-wrapper {
  width: 100%;
  height: 100%;
}

.canvas-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.7) 0%, transparent 100%);
  color: white;
  z-index: 2;
  pointer-events: none;
}

.threejs-canvas {
  display: block;
  width: 100%;
  height: 100%;
}

.planets-section {
  padding: 80px 0;
  background-color: var(--light-color);
}

.app-footer {
  padding: 60px 0 20px;
  background-color: var(--dark-color);
  color: white;
}

/* Componentes */
.section-title {
  font-size: 2.5rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  color: var(--primary-color);
}

.section-text {
  font-size: 1.1rem;
  line-height: 1.6;
  color: #555;
}

.planet-card {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  height: 100%;
}

.planet-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2) !important;
}

.planet-name {
  color: var(--primary-color);
  font-weight: 600;
}

.planet-image {
  border-bottom: 1px solid #eee;
}

.canvas-overlay {
  position: absolute;
  bottom: 30px;
  left: 0;
  width: 100%;
  text-align: center;
  color: white;
  z-index: 2;
  pointer-events: none;
}

.overlay-title {
  font-size: 1.8rem;
  margin-bottom: 0.5rem;
  text-shadow: 0 2px 5px rgba(0, 0, 0, 0.5);
}

.overlay-text {
  font-size: 1.1rem;
  opacity: 0.8;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.5);
}

.footer-title {
  font-size: 1.5rem;
  margin-bottom: 1rem;
}

.footer-text {
  opacity: 0.8;
}

.copyright {
  opacity: 0.6;
  font-size: 0.9rem;
}

.scroll-hint {
  animation: bounce 2s infinite;
  position: absolute;
  bottom: 50px;
  left: 50%;
  transform: translateX(-50%);
  color: white;
  cursor: pointer;
}

/* Animaciones */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes bounce {
  0%, 20%, 50%, 80%, 100% {transform: translateY(0);}
  40% {transform: translateY(-20px);}
  60% {transform: translateY(-10px);}
}

@media (max-width: 960px) {
  .hero-title {
    font-size: 3rem;
  }

  .hero-subtitle {
    font-size: 1.2rem;
  }

  .section-title {
    font-size: 2rem;
  }
}

@media (max-width: 600px) {
  .hero-title {
    font-size: 2.2rem;
  }

  .hero-subtitle {
    font-size: 1rem;
  }

  .canvas-section {
    height: 60vh;
  }
}
</style>
