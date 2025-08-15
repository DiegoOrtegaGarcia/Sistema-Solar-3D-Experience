export const useHelloWorld = (canvasSection: Ref<HTMLCanvasElement>) => {
  const scrollToCanvas = () => {
    canvasSection.value.scrollIntoView({ behavior: 'smooth' })
  }

  const selectedPlanetId = ref()

  const modalTransition = ref('dialog-bottom-transition')

  const openPlanetModal = (planetId: number) => {
    modalTransition.value = 'dialog-bottom-transition'
    selectedPlanetId.value = planetId
  }

  const closePlanetModal = () => {
    modalTransition.value = 'dialog-top-transition'
    setTimeout(() => {
      selectedPlanetId.value = null
    }, 300)
  }

  return {
    scrollToCanvas, canvasSection, openPlanetModal, closePlanetModal, selectedPlanetId, modalTransition,
  }
}
