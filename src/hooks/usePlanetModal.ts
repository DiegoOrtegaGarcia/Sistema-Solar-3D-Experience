import type { PlanetModalEmits } from '@/types/types'
import { planetsInfo } from '@/Constants/constants'

export const usePLanetModal = (emit: PlanetModalEmits, props: { planetId: number | null }, showModal: Ref<boolean>) => {
  const currentPlanet = ref<any>(null)

  watch(() => props.planetId, newId => {
    showModal.value = newId !== null
    if (newId) {
      currentPlanet.value = planetsInfo[newId - 1]
    }
  })

  const closeModal = () => {
    emit('close')
  }

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      closeModal()
    }
  }

  // Formatear valores grandes
  const formatValue = (value: string) => {
    if (value.includes('×10')) {
      const [base, exponent] = value.split('×10^')
      return `${base} × 10<sup>${exponent}</sup>`
    }
    return value
  }

  return {
    formatValue, handleKeyDown, closeModal, currentPlanet,
  }
}
