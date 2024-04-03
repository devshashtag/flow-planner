import { storage } from '/assets/js/index.js';
import { getItemElements, getItemElement, getGroupElements, getInputElement } from '/assets/js/modules/template.js';

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

function addGroup(e) {
  const target = e.target.tagName.toLowerCase() === 'span' ? e.target.parentNode : e.target;
  const addGroupBtn = document.getElementById('group-add');
  const groupListElm = document.getElementById('group-list');
  const itemListElm = document.getElementById('item-list');
  const itemTitleInput = document.getElementById('item-title');
  const inputElm = getInputElement();

  if (target.classList.contains('close-btn')) {
    const inputElm = document.querySelector('.interactive-input');
    addGroupBtn.classList.remove('close-btn');
    groupListElm.removeChild(inputElm);
    return;
  }

  addGroupBtn.classList.add('close-btn');
  groupListElm.appendChild(inputElm);
  inputElm.focus();

  inputElm.addEventListener('keypress', function (e) {
    const name = inputElm.innerText.trim();
    if (e.key === 'Enter' && name !== '') {
      groupListElm.removeChild(inputElm);
      addGroupBtn.classList.remove('close-btn');

      const group = {
        name: name,
        id: storage.config.counters.groups++,
        active: true,
      };

      storage.newGroup(group);

      // reload groups after adding new group
      groupListElm.replaceChildren(...getGroupElements());

      // reload items from new active group
      itemListElm.replaceChildren(...getItemElements());

      itemTitleInput.focus();
    }
  });
}

function addItem() {
  const itemTitleInput = document.getElementById('item-title');
  const itemListElm = document.getElementById('item-list');
  const title = itemTitleInput.value;
  const date = getDate();
  const groupId = storage.getActiveGroupId();

  // focus input
  itemTitleInput.focus();

  if (!title.trim() || !groupId) return;

  // new item
  const item = {
    type: 'task',
    created: date,
    title: title,
  };

  // save item
  storage.newItem(item);

  // render item
  const itemElement = getItemElement(item);
  itemListElm.appendChild(itemElement);

  // clear item input
  itemTitleInput.value = '';
}

function changeActiveGroup(e) {
  const itemTitleInput = document.getElementById('item-title');
  const target = e.target;

  if (target.classList.contains('nav__group')) {
    const activeGroup = document.getElementById('active-group');
    const itemListElm = document.getElementById('item-list');

    // remove old active-group
    activeGroup?.removeAttribute('id');

    // active clicked group
    target.id = 'active-group';

    // save active-group
    storage.setActiveGroup(target.dataset.id);

    // reload items from new active group
    itemListElm.replaceChildren(...getItemElements());

    itemTitleInput.focus();
  }
}

export { getDate, addGroup, addItem, changeActiveGroup };
