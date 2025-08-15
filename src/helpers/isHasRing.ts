import type { planetInterface, planetMeshInterface } from '@/types/types'
import * as THREE from 'three'
import { ringMaterial } from '@/Constants/constants'

export const isHasRing = (planet: planetInterface, planetMesh: planetMeshInterface) => {
  if (planet.hasRings) {
    const ringGeometry = new THREE.RingGeometry(
      planet.radius * 0.6, // Radio interno (ligeramente mayor que el planeta)
      planet.radius * 1, // Radio externo
      64, // Segmentos para suavidad
    )
    const ringMesh = new THREE.Mesh(ringGeometry, ringMaterial)
    ringMesh.rotation.x = Math.PI / 1.7
    planetMesh.add(ringMesh)
  }
}
