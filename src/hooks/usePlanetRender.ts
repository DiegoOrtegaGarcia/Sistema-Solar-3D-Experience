import type { RouteParams } from '@/types/types'
import * as THREE from 'three'
import { onMounted, onUnmounted } from 'vue'
import { backgroundCubeMap, moonMaterial, planets, planetsInfo, sphereGeomatry } from '@/Constants/constants'
import { isHasRing } from '@/helpers/isHasRing'

export const usePlanetRender = (props: RouteParams) => {
  let scene: THREE.Scene
  let camera: THREE.PerspectiveCamera
  let renderer: THREE.WebGLRenderer
  let planet: THREE.Mesh
  let animationId: number

  const init = () => {
    const canvas = document.querySelector('canvas.canvas-planet-info') as HTMLCanvasElement
    scene = new THREE.Scene()
    scene.background = backgroundCubeMap
    // Usar el material importado correctamente
    planet = new THREE.Mesh(
      sphereGeomatry,
      planetsInfo[props.id - 1].material, // Material corregido
    )
    planet.scale.setScalar(8)

    if (planetsInfo[props.id - 1].moons >= 1) {
      for (const [_index, moon] of planets[props.id - 1].moons.entries()) {
        const moonMesh = new THREE.Mesh(
          sphereGeomatry,
          moonMaterial,
        )
        moonMesh.scale.setScalar(moon.radius - 0.5)
        planet.add(moonMesh)
      }
    }

    isHasRing(planets[props.id - 1], planet)

    scene.add(planet)

    // Configurar luces
    const ambientLight = new THREE.AmbientLight(0xff_ff_ff, 0.8)
    scene.add(ambientLight)

    const directionalLight = new THREE.DirectionalLight(0xff_ff_00, 0.3)
    directionalLight.position.set(5, 10, 7)
    scene.add(directionalLight)

    // Configurar cámara
    camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      1000,
    )
    camera.position.set(0, 0, 50)

    // Añadir controles de órbita

    renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

    animate()
  }

  const animate = () => {
    animationId = requestAnimationFrame(animate)
    planet.rotation.y += planets[props.id - 1].speed// Rotación automática

    for (const [index, child] of planet.children.entries()) {
      const mesh = child as THREE.Mesh
      if (mesh.geometry?.type === 'SphereGeometry') {
        const moonData = planets[props.id - 1].moons[index]
        mesh.rotation.y += 0.01 + (index > 0 ? 0.001 : 0)
        mesh.position.x = Math.sin(mesh.rotation.y) * moonData.distance
        mesh.position.z = Math.cos(mesh.rotation.y) * moonData.distance
      }
    }

    renderer.render(scene, camera)
  }

  const handleResize = () => {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
  }

  const cleanup = () => {
    cancelAnimationFrame(animationId)
    window.removeEventListener('resize', handleResize)
  }

  onMounted(() => {
    init()
    window.addEventListener('resize', handleResize)
  })

  onUnmounted(() => {
    cleanup()
  })
}
