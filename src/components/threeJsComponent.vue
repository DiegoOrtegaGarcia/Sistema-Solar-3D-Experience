<template>
  <canvas class="threejs-canvas" />
</template>

<script setup>
  import * as THREE from 'three'
  import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
  import { onMounted, onUnmounted } from 'vue'
  import { backgroundCubeMap, orbitMaterial, planets, sphereGeomatry, sunMaterial } from '@/Constants/constants'
  import { createMoons } from '@/helpers/createMoons'
  import { isHasRing } from '@/helpers/isHasRing'

  let scene, camera, renderer, controls
  let animationFrameId

  const initThreeJS = () => {
    // Obtener el canvas del DOM
    const canvas = document.querySelector('canvas.threejs-canvas')

    // Crear la escena
    scene = new THREE.Scene()

    // Background de la Escena
    scene.background = backgroundCubeMap

    // Crear el sol
    const sun = new THREE.Mesh(sphereGeomatry, sunMaterial)
    sun.scale.setScalar(8) // Tamaño aumentado del Sol
    scene.add(sun)

    // Luces de la escena
    const ambientLight = new THREE.AmbientLight(0xff_ff_ff, 0.15)
    const pointLight = new THREE.PointLight(0xff_ff_ff, 200)
    scene.add(pointLight, ambientLight)

    // Configurar cámara
    camera = new THREE.PerspectiveCamera(
      45, // Aumentamos el campo de visión
      window.innerWidth / window.innerHeight,
      0.1,
      1000, // Aumentamos el plano lejano
    )

    camera.position.set(0, 15, 50)
    camera.lookAt(0, 0, 0)

    // Configurar renderer

    renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

    // Configurar controles
    controls = new OrbitControls(camera, canvas)
    controls.enableDamping = true
    controls.dampingFactor = 0.05
    controls.minDistance = 30 // Distancia mínima para evitar acercarse demasiado
    controls.maxDistance = 100 // Distancia máxima para mantener los planetas visibles
    controls.maxPolarAngle = Math.PI * 0.9 // Limitar ángulo para no pasar por debajo

    // Crear los planetas
    const planetsMeshes = planets.map(planet => {
      const planetMesh = new THREE.Mesh(
        sphereGeomatry,
        planet.material,
      )
      planetMesh.scale.setScalar(planet.radius)
      planetMesh.position.x = planet.distance

      const orbitGeometry = new THREE.RingGeometry(
        planet.distance - 0.01, // Radio interno (ligeramente menor)
        planet.distance + 0.01, // Radio externo (ligeramente mayor)
        64, // Mayor número de segmentos para suavidad
      )

      const Orbitmesh = new THREE.Mesh(orbitGeometry, orbitMaterial)
      Orbitmesh.rotation.x = Math.PI / 2
      scene.add(Orbitmesh)

      isHasRing(planet, planetMesh)

      createMoons(planet, planetMesh)

      scene.add(planetMesh)

      return planetMesh
    })
    // Función de animación
    const animate = () => {
      for (const [index, planet] of planetsMeshes.entries()) {
        planet.rotation.y += planets[index].speed
        planet.position.x = Math.sin(planet.rotation.y) * planets[index].distance
        planet.position.z = Math.cos(planet.rotation.y) * planets[index].distance

        for (const child of planet.children) {
          if (child.geometry.type === 'SphereGeometry') {
            const moonIndex = planet.children.filter(c => c.geometry.type === 'SphereGeometry').indexOf(child)
            child.rotation.y += planets[index].moons[moonIndex].speed
            child.position.x = Math.sin(child.rotation.y) * planets[index].moons[moonIndex].distance
            child.position.z = Math.cos(child.rotation.y) * planets[index].moons[moonIndex].distance
          }
        }
      }

      controls.update()
      renderer.render(scene, camera)
      animationFrameId = requestAnimationFrame(animate)
    }

    animate()

    // Manejar redimensionamiento
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }

    window.addEventListener('resize', handleResize)

    // Limpieza al desmontar el componente
    onUnmounted(() => {
      window.removeEventListener('resize', handleResize)
      cancelAnimationFrame(animationFrameId)
      if (controls) controls.dispose()
      if (renderer) renderer.dispose()
    })
  }

  onMounted(() => {
    initThreeJS()
  })

</script>

<style scoped>
.threejs-canvas {
  display: block;
  width: 100%;
  height: 100%;
  outline: none;
}
</style>
