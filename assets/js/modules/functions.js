import { settings } from '/assets/js/index.js';
import { getItemElements, getItemElement } from '/assets/js/modules/template.js';

// formating numbers by comma
function commafy(num) {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

// get time based on timezone
function getDate(timeZone = 'Asia/tehran') {
  const options = {
    timeZone,
    hour12: false,
  };

  const currentDate = new Date();
  const localTime = currentDate.toLocaleString('en-US', options).split(', ');

  // date %y:%m:%d
  const [month, day, year] = localTime[0].split('/');
  const date = [year, month, day].map((date) => date.padStart(2, '0')).join('-');

  // time %H:%M
  const time = localTime[1].split(':').slice(0, -1).join(':');

  return { date, time };
}

function addItem() {
  const itemTitleInput = document.getElementById('item-title');
  const itemListElm = document.getElementById('item-list');
  const title = itemTitleInput.value;
  const date = getDate();

  // focus input
  itemTitleInput.focus();

  if (!title.trim()) return;

  // new item
  const item = {
    type: 'task',
    created: date,
    title: title,
  };

  // save item
  settings.pushItem(item);

  // render item
  const itemElement = getItemElement(item);
  itemListElm.appendChild(itemElement);

  // clear item input
  itemTitleInput.value = '';
}

function changeActiveGroup(e) {
  const target = e.target;

  if (target.classList.contains('nav__group')) {
    const activeGroup = document.getElementById('active-group');
    const itemListElm = document.getElementById('item-list');

    // remove old active-group
    activeGroup?.removeAttribute('id');

    // active clicked group
    target.id = 'active-group';

    // save active-group
    settings.changeGroup(+target.dataset.id);

    // reload items from new active group
    itemListElm.replaceChildren(...getItemElements());
  }
}

export { getDate, addItem, changeActiveGroup };
