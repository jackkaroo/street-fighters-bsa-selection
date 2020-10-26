import { createElement } from '../helpers/domHelper';

export function createFighterPreview(fighter, position) {
  const positionClassName = position === 'right' ? 'fighter-preview___right' : 'fighter-preview___left';
  const fighterElement = createElement({
    tagName: 'div',
    className: `fighter-preview___root ${positionClassName}`,
  });

  if(fighter!=undefined){
    const fighterImage = createElement({
      tagName: 'img',
      attributes: { src: fighter.source}
    });

    const fighterInfo = createElement({
      tagName:'div',
      className: 'fighter-preview___info'
    })

    fighterInfo.innerHTML = `
      <p>Name : ${fighter.name}</p>
      <p>Health : ${fighter.health}</p>
      <p>Attack : ${fighter.attack}</p>
      <p>Defense : ${fighter.defense}</p>
      `

    fighterElement.append(fighterImage)
    fighterElement.append(fighterInfo)
  }
  return fighterElement;
}

export function createFighterImage(fighter) {
  const { source, name } = fighter;
  const attributes = { src: source };
  const imgElement = createElement({
    tagName: 'img',
    className: 'fighter-preview___img',
    title: name,
    alt: name,
    attributes,
  });

  return imgElement;
}
