export interface RouteParams {
  id: number
}
type PlanetModalEmits = {
  (e: 'close'): void
}

export interface planetInterface {

  name: string
  radius: number
  distance: number
  speed: number
  material: MeshStandardMaterial
  moons: moons[] | []
  hasRings?: boolean

}

export interface moons {
  name: string
  radius: number
  distance: number
  speed: number
}
export type planetMeshInterface = THREE.Mesh<THREE.SphereGeometry, THREE.MeshStandardMaterial, THREE.Object3DEventMap>
