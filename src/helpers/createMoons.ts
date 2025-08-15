import type { planetInterface, planetMeshInterface } from '@/types/types'
import * as THREE from 'three'
import { moonMaterial, sphereGeomatry } from '@/Constants/constants'

export const createMoons = (planet: planetInterface, planetMesh: planetMeshInterface) => {
  if (planet.moons.length > 0) {
    for (const moon of planet.moons) {
      const moonMesh = new THREE.Mesh(
        sphereGeomatry,
        moonMaterial,
      )
      moonMesh.scale.setScalar(moon.radius)
      moonMesh.position.x = moon.distance
      planetMesh.add(moonMesh)
    }
  }
}
