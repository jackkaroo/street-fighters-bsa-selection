import { controls } from '../../constants/controls';
import {renderArena} from './arena'

export async function fight(firstFighter, secondFighter) {

  if(firstFighter===secondFighter){ //the only way which I came up with to remove the bug with with links to the same object
    firstFighter={...firstFighter}
  }

  let handleFightsActions = fightersActions;
  handleFightsActions.fighters = [firstFighter, secondFighter];
  handleFightsActions.moves = handleFightsActions.moves || {};
  document.addEventListener('keydown', fightersActions, false);
  document.addEventListener('keyup', fightersActions, false);

  return new Promise((resolve) => {
    if(firstFighter.health===0 || secondFighter.health===0 ){
      document.removeEventListener('keydown', fightersActions, false);
      document.removeEventListener('keyup', fightersActions, false);
    }
    if(firstFighter.health===0) resolve(secondFighter);
    else if(secondFighter.health===0) resolve(firstFighter);
  });
}

let firstFighterCanUseCombo = true;
let secondFighterCanUseCombo = true;

export function getDamage(attacker, defender) {
  let power = getHitPower(attacker) - getBlockPower(defender)
  if(getBlockPower(defender)>getHitPower(attacker) || power<0) return 0
  return power
}

export function getHitPower(fighter) {
  let attack = fighter.attack;
  let randomNumber = Math.random() + 1;
  let power = attack * randomNumber;
  return power;
}

export function getBlockPower(fighter) {
  let defense = fighter.defense;
  const randomNumber = Math.random() + 1;
  let power = defense * randomNumber;
  return power;
}

function getFatalHit(fighter){
  return 2 * fighter.attack;
}

export const fightersActions = function(event) {
  const [firstFighter, secondFighter] = fightersActions.fighters;
  const allMoves = fightersActions.moves;
  allMoves[event.code] = event.type == 'keydown';

  if(allMoves.KeyA) {
    if(allMoves.KeyD) console.log(firstFighter.name + ' cant hit when blocked ')
    if(allMoves.KeyL) console.log(secondFighter.name + ' dodged ')
    else if (!allMoves.KeyL && !allMoves.KeyD) {
      secondFighter.health-=getDamage(firstFighter,secondFighter)
      if(secondFighter.health<0) secondFighter.health=0;
    }
  }

  if(allMoves.KeyQ && allMoves.KeyW && allMoves.KeyE &&!allMoves.KeyD) {
    if(firstFighterCanUseCombo){
      secondFighter.health-=2*getFatalHit(firstFighter)
      if(secondFighter.health<0) secondFighter.health=0;
      firstFighterCanUseCombo = false
    } else console.log('Should wait 10s')
    setTimeout(() => firstFighterCanUseCombo=true, 10000);
  }

  if(allMoves.KeyJ) {
    if(allMoves.KeyL) console.log(secondFighter.name + ' cant hit when blocked')
    if(allMoves.KeyD) console.log(firstFighter.name + ' dodged ')
    else if(!allMoves.KeyL && !allMoves.KeyD) {
    firstFighter.health-=getDamage(secondFighter,firstFighter)
    if(firstFighter.health<0) firstFighter.health=0;
    }
  }

  if(allMoves.KeyU && allMoves.KeyI && allMoves.KeyO && !allMoves.KeyL) {
    if(secondFighterCanUseCombo){
      firstFighter.health-=2*getFatalHit(secondFighter)
      if(firstFighter.health<0) firstFighter.health=0;
      secondFighterCanUseCombo = false
    } else console.log('Should wait 10s')
    setTimeout(() => secondFighterCanUseCombo=true, 10000);
  }
  renderArena([firstFighter, secondFighter]);
}


