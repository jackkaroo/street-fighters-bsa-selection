import { createElement } from '../helpers/domHelper';
import { createFighterImage } from './fighterPreview';
import { fight }  from './fight';
import { showWinnerModal } from './modal/winner'


export function renderArena(selectedFighters) {
  const root = document.getElementById('root');
  const arena = createArena(selectedFighters);
  root.innerHTML = '';
  root.append(arena);
  fight(selectedFighters[0],selectedFighters[1]).then(obj => {
    showWinnerModal(obj)
  });
 
}

function createArena(selectedFighters) {
  const arena = createElement({ tagName: 'div', className: 'arena___root' });
  const healthIndicators = createHealthIndicators(...selectedFighters);
  const fighters = createFighters(...selectedFighters);
  
  arena.append(healthIndicators, fighters);
  return arena;
}

function createHealthIndicators(leftFighter, rightFighter) {
  const healthIndicators = createElement({ tagName: 'div', className: 'arena___fight-status' });
  const versusSign = createElement({ tagName: 'div', className: 'arena___versus-sign' });
  const leftFighterIndicator = createHealthIndicator(leftFighter, 'left');
  const rightFighterIndicator = createHealthIndicator(rightFighter, 'right');

  healthIndicators.append(leftFighterIndicator, versusSign, rightFighterIndicator);
  return healthIndicators;
}

let maxHealthLeft = 0
let maxHealthRight = 0
function createHealthIndicator(fighter, position) {
  const { name } = fighter;
  const container = createElement({ tagName: 'div', className: 'arena___fighter-indicator' });
  const fighterName = createElement({ tagName: 'span', className: 'arena___fighter-name' });
  const indicator = createElement({ tagName: 'div', className: 'arena___health-indicator' });
  const bar = createElement({ tagName: 'div', className: 'arena___health-bar', attributes: { id: `${position}-fighter-indicator` }});

  fighterName.innerText = name;

  let maxHealth = 0
  if(position==='left'){
    if(fighter.health>maxHealthLeft) maxHealthLeft = fighter.health
    maxHealth = maxHealthLeft
  }
  else if(position==='right'){
    if(fighter.health>maxHealthRight) maxHealthRight = fighter.health
    maxHealth = maxHealthRight
  }

  let width = fighter.health*100/maxHealth
  if(fighter.health<=0) width=0
  bar.style.width = `${width}%`

  indicator.append(bar);
  container.append(fighterName, indicator);

  return container;
}

function createFighters(firstFighter, secondFighter) {
  const battleField = createElement({ tagName: 'div', className: `arena___battlefield` });
  const firstFighterElement = createFighter(firstFighter, 'left');
  const secondFighterElement = createFighter(secondFighter, 'right');

  battleField.append(firstFighterElement, secondFighterElement);

  return battleField;
}

function createFighter(fighter, position) {
  const imgElement = createFighterImage(fighter);
  const positionClassName = position === 'right' ? 'arena___right-fighter' : 'arena___left-fighter';
  const fighterElement = createElement({
    tagName: 'div',
    className: `arena___fighter ${positionClassName}`,
  });
  
  fighterElement.append(imgElement);
  return fighterElement;
}
