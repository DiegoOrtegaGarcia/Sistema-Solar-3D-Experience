<script setup lang="ts">
  import type { RouteParams } from '@/types/types'
  import { usePlanetRender } from '@/hooks/usePlanetRender'

  const props = defineProps<RouteParams>()

  // Variables para Three.js
  usePlanetRender(props)
</script>

<template>
  <canvas class="canvas-planet-info" />
</template>

<style scoped>
planet-viewer {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden; /* Elimina scrollbars */
}

.canvas-planet-info {
  display: block;
  width: 100%;
  height: 100%;
  background: #000;
}
</style>
