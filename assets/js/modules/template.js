import { settings } from '/assets/js/index.js';

function getGroupElement(group) {
  const element = document.createElement('li');
  element.classList.add('nav__group');
  element.dataset.id = group.id;
  element.innerText = group.name;

  if (group.active) element.id = 'active-group';

  return element;
}

function getItemElement(item) {
  const element = document.createElement('li');
  const textElement = document.createElement('div');

  // classes
  textElement.classList.add('item__text');
  element.classList.add('list__item');
  element.classList.add(`type__${item.type}`);
  if (item?.status) element.classList.add(`${item.type}--${item.status}`);

  // content
  element.dataset.content = item.created.time;

  // text
  textElement.innerText = item.title;

  // add text to element
  element.appendChild(textElement);

  return element;
}

function getGroupElements() {
  const groups = settings.getGroups();
  return groups.map(getGroupElement);
}

function getItemElements() {
  const items = settings.getItems();
  return items.map(getItemElement);
}

export { getGroupElements, getItemElements, getGroupElement, getItemElement };
