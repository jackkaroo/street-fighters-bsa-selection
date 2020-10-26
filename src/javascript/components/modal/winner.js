import { showModal } from './modal'

export function showWinnerModal(fighter) {
  // call showModal function 

  showModal({
    title:`${fighter.name} win!`,
    bodyElement:`Health:${fighter.health}, Attack:${fighter.attack}, Defense:${fighter.defense}`
  })
}
