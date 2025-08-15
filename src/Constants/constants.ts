import * as THREE from 'three'
const textureLoader = new THREE.TextureLoader()
const cubeTextureLoader = new THREE.CubeTextureLoader()

cubeTextureLoader.setPath('./static/textures/cubeMap/')

export const backgroundCubeMap = cubeTextureLoader.load([
  'px.png',
  'nx.png',
  'py.png',
  'ny.png',
  'pz.png',
  'nz.png',
])

export const sunTexture = textureLoader.load('./static/textures/2k_sun.jpg')
export const eartTexture = textureLoader.load('./static/textures/2k_earth_daymap.jpg')
export const mercuryTexture = textureLoader.load('./static/textures/2k_mercury.jpg')
export const venusTexture = textureLoader.load('./static/textures/2k_venus_surface.jpg')
export const jupiterTexture = textureLoader.load('./static/textures/jupiter.jpg')
export const neptunoTexture = textureLoader.load('./static/textures/neptuno.jpg')
export const saturnoTexture = textureLoader.load('./static/textures/saturno.jpg')
export const uranosTexture = textureLoader.load('./static/textures/Uranos.jpg')
export const marsTexture = textureLoader.load('./static/textures/2k_mars.jpg')
export const moonTexture = textureLoader.load('./static/textures/2k_moon.jpg')

export const sphereGeomatry = new THREE.SphereGeometry(1, 32, 32)

export const eartMaterial = new THREE.MeshStandardMaterial({ map: eartTexture })
export const mercuryMaterial = new THREE.MeshStandardMaterial({ map: mercuryTexture })
export const venusMaterial = new THREE.MeshStandardMaterial({ map: venusTexture })
export const marsMaterial = new THREE.MeshStandardMaterial({ map: marsTexture })
export const jupiterMaterial = new THREE.MeshStandardMaterial({ map: jupiterTexture })
export const saturnoMaterial = new THREE.MeshStandardMaterial({ map: saturnoTexture })
export const neptunoMaterial = new THREE.MeshStandardMaterial({ map: neptunoTexture })
export const uranosMaterial = new THREE.MeshStandardMaterial({ map: uranosTexture })
export const moonMaterial = new THREE.MeshStandardMaterial({ map: moonTexture })
export const sunMaterial = new THREE.MeshBasicMaterial({
  map: sunTexture,
})
export const orbitMaterial = new THREE.MeshBasicMaterial({ color: 0xff_ff_ff, side: THREE.DoubleSide })
export const ringMaterial = new THREE.MeshStandardMaterial({
  color: 0xdd_dd_bb, // Un color más natural
  metalness: 0.3, // Un poco de metalicidad
  roughness: 0.7, // Superficie no muy pulida
  side: THREE.DoubleSide,
  transparent: true,
  opacity: 0.8, // Los anillos son parcialmente transparentes
})

export const planets = [
  {
    name: 'Mercurio',
    radius: 0.5,
    distance: 10,
    speed: 0.01,
    material: mercuryMaterial,
    moons: [],
  },
  {
    name: 'Venus',
    radius: 0.8,
    distance: 15,
    speed: 0.007,
    material: venusMaterial,
    moons: [],
  },
  {
    name: 'Tierra',
    radius: 1,
    distance: 20,
    speed: 0.005,
    material: eartMaterial,
    moons: [
      {
        name: 'Moon',
        radius: 0.3,
        distance: 2,
        speed: 0.005,
      },
    ],
  },
  {
    name: 'Marte',
    radius: 0.7,
    distance: 25,
    speed: 0.003,
    material: marsMaterial,
    moons: [
      {
        name: 'Phobos',
        radius: 0.1,
        distance: 2,
        speed: 0.02,
      },
      {
        name: 'Deimos',
        radius: 0.2,
        distance: 3,
        speed: 0.015,
        color: 0xff_ff_ff,
      },
    ],
  },
  {
    name: 'Jupiter',
    radius: 2.5, // El planeta más grande
    distance: 35,
    speed: 0.002,
    material: jupiterMaterial,
    moons: [
      {
        name: 'Io',
        radius: 0.2,
        distance: 2,
        speed: 0.02,
      },
      {
        name: 'Europa',
        radius: 0.18,
        distance: 2,
        speed: 0.018,
      },
      // Júpiter tiene 79 lunas conocidas, puedes añadir más
    ],
  },
  {
    name: 'Saturno',
    radius: 2,
    distance: 45,
    speed: 0.0015,
    material: saturnoMaterial,
    hasRings: true, // Para añadir anillos después
    rings: 7,
    moons: [
      {
        name: 'Titan',
        radius: 0.25,
        distance: 2,
        speed: 0.015,
      },
    ],
  },
  // Gigantes de hielo
  {
    name: 'Uranos',
    radius: 1.5,
    distance: 55,
    speed: 0.001,
    material: uranosMaterial,
    moons: [
      {
        name: 'Titania',
        radius: 0.15,
        distance: 2,
        speed: 0.01,
      },
    ],
  },
  {
    name: 'Neptuno',
    radius: 1.3,
    distance: 65,
    speed: 0.0008,
    material: neptunoMaterial,
    moons: [
      {
        name: 'Triton',
        radius: 0.22,
        distance: 2,
        speed: 0.008,
      },
    ],
  },
]

export const planetsInfo = [
  {
    name: 'Mercurio',
    description: 'El planeta más pequeño y cercano al Sol, con temperaturas extremas.',
    image: './static/Planets_Pictutes/mercurio.jpg',
    type: 'Terrestre',
    diameter: '4,880 km',
    mass: '3.301 × 10^23 kg',
    gravity: '3.7 m/s²',
    orbitPeriod: '88 días terrestres',
    rotationPeriod: '58.6 días terrestres',
    temperatureRange: '-173°C a 427°C',
    moons: 0,
    rings: 0,
    atmosphere: 'Traza de gases (oxígeno, sodio, hidrógeno)',
    curiosities: [
      'Tiene una cola de sodio visible',
      'Su núcleo ocupa el 85% de su radio',
      'Experimenta el doble de amaneceres en un día solar',
    ],
    exploration: 'Visitado por Mariner 10 y MESSENGER',
    material: mercuryMaterial,
  },
  {
    name: 'Venus',
    description: 'El planeta más caliente con una densa atmósfera tóxica de CO₂.',
    image: './static/Planets_Pictutes/Venus.jng.png',
    type: 'Terrestre',
    diameter: '12,104 km',
    mass: '4.867 × 10^24 kg',
    gravity: '8.87 m/s²',
    orbitPeriod: '225 días terrestres',
    rotationPeriod: '243 días terrestres (retrógrado)',
    temperatureRange: '462°C (constante)',
    moons: 0,
    rings: 0,
    atmosphere: '96.5% CO₂, 3.5% N₂ con nubes de ácido sulfúrico',
    curiosities: [
      'Día más largo que su año',
      'Presión atmosférica 92 veces la terrestre',
      'Brillo visible desde la Tierra como "estrella matutina"',
    ],
    exploration: 'Explorado por Venera (URSS) y Magellan (NASA)',
    material: venusMaterial,
  },

  {
    name: 'Tierra',
    description: 'Nuestro hogar, el único planeta conocido con vida.',
    image: './static/Planets_Pictutes/tierra.jpg',
    type: 'Terrestre',
    diameter: '12,742 km',
    mass: '5.972 × 10^24 kg',
    gravity: '9.81 m/s²',
    orbitPeriod: '365.25 días',
    rotationPeriod: '23h 56m 4s',
    temperatureRange: '-89°C a 56.7°C',
    moons: 1,
    rings: 0,
    atmosphere: '78% N₂, 21% O₂, 1% otros',
    curiosities: [
      '71% superficie cubierta de agua',
      'Tectónica de placas activa',
      'Campo magnético protector',
    ],
    exploration: 'Único planeta con vida confirmada',
    material: eartMaterial,
  },
  {
    name: 'Marte',
    description: 'El planeta rojo, objetivo de exploración humana.',
    image: './static/Planets_Pictutes/marte.jpg',
    type: 'Terrestre',
    diameter: '6,779 km',
    mass: '6.39 × 10^23 kg',
    gravity: '3.71 m/s²',
    orbitPeriod: '687 días terrestres',
    rotationPeriod: '24h 37m 22s',
    temperatureRange: '-140°C a 20°C',
    moons: 2,
    rings: 0,
    atmosphere: '95% CO₂, 2.7% N₂, 1.6% Ar',
    curiosities: [
      'Tiene el volcán más grande del sistema solar (Olympus Mons)',
      'Posible agua líquida bajo superficie',
      'Estaciones como la Tierra pero más extremas',
    ],
    exploration: 'Explorado por rovers (Curiosity, Perseverance)',
    material: marsMaterial,
  },
  {
    name: 'Jupiter',
    description: 'El gigante gaseoso más grande del sistema solar.',
    image: './static/Planets_Pictutes/Jupiter.jpg',
    type: 'Gaseoso',
    diameter: '139,820 km',
    mass: '1.898 × 10^27 kg',
    gravity: '24.79 m/s²',
    orbitPeriod: '11.9 años terrestres',
    rotationPeriod: '9h 55m 30s',
    temperatureRange: '-108°C en nubes superiores',
    moons: 79,
    rings: 4,
    atmosphere: '90% H₂, 10% He con bandas de nubes',
    curiosities: [
      'La Gran Mancha Roja es una tormenta centenaria',
      'Podría haberse convertido en una estrella',
      'Campo magnético 20,000 veces más fuerte que la Tierra',
    ],
    exploration: 'Visitado por Pioneer, Voyager, Galileo, Juno',
    material: jupiterMaterial,
  },
  {
    name: 'Saturno',
    description: 'El planeta de los anillos, famoso por su sistema de anillos helados.',
    image: './static/Planets_Pictutes/Saturno.jpg',
    type: 'Gaseoso',
    diameter: '116,460 km',
    mass: '5.683 × 10^26 kg',
    gravity: '10.44 m/s²',
    orbitPeriod: '29.5 años terrestres',
    rotationPeriod: '10h 33m 38s',
    temperatureRange: '-139°C en nubes superiores',
    moons: 83,
    rings: 7,
    atmosphere: '96% H₂, 3% He con vientos de 1,800 km/h',
    curiosities: [
      'Los anillos tienen solo 10-100 m de espesor',
      'Densidad menor que el agua (flotaría en una bañera gigante)',
      'Luna Titán tiene lagos de metano líquido',
    ],
    exploration: 'Explorado por Pioneer, Voyager, Cassini-Huygens',
    material: saturnoMaterial,
  },
  {
    name: 'Uranos',
    description: 'El gigante de hielo inclinado que gira de lado.',
    image: './static/Planets_Pictutes/Uranos.jpg',
    type: 'Gigante de hielo',
    diameter: '50,724 km',
    mass: '8.681 × 10^25 kg',
    gravity: '8.69 m/s²',
    orbitPeriod: '84 años terrestres',
    rotationPeriod: '17h 14m 24s (retrógrado)',
    temperatureRange: '-197°C',
    moons: 27,
    rings: 13,
    atmosphere: '83% H₂, 15% He, 2% CH₄ (da color azul)',
    curiosities: [
      'Eje de rotación inclinado 98° (gira de lado)',
      'Temporadas extremas de 21 años',
      'Descubierto en 1781 por William Herschel',
    ],
    exploration: 'Visitado solo por Voyager 2 en 1986',
    material: uranosMaterial,
  },
  {
    name: 'Neptuno',
    description: 'El planeta más ventoso con vientos supersónicos.',
    image: './static/Planets_Pictutes/Neptuno.jpg',
    type: 'Gigante de hielo',
    diameter: '49,244 km',
    mass: '1.024 × 10^26 kg',
    gravity: '11.15 m/s²',
    orbitPeriod: '165 años terrestres',
    rotationPeriod: '16h 6m 36s',
    temperatureRange: '-201°C',
    moons: 14,
    rings: 5,
    atmosphere: '80% H₂, 19% He, 1% CH₄',
    curiosities: [
      'Vientos más rápidos del sistema solar (2,100 km/h)',
      'Descubierto mediante cálculos matemáticos en 1846',
      'Luna Tritón orbita en dirección contraria (capturada)',
    ],
    exploration: 'Visitado solo por Voyager 2 en 1989',
    material: neptunoMaterial,
  },
]

export const socialIcons = [
  { name: 'mdi-github', color: 'light-blue', src: 'https://github.com/DiegoOrtegaGarcia' },
]
