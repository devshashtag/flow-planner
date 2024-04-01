import { generateTabsMarkup, generateItemsMarkup, tabMarkup, itemMarkup } from '/assets/js/modules/template.js';

// formating numbers by comma
function commafy(num) {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

// get data from localstorage
function getStoredData(key) {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : [];
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
  const activeTabKey = document.getElementById('active-tab').dataset.key;
  const itemTitleInput = document.getElementById('item-title');
  const itemListElm = document.getElementById('item-list');

  const title = itemTitleInput.value;
  const { date, time } = getDate();

  if (!title.trim()) return;

  const item = {
    type: 'task',
    created: { date, time },
    title: title,
  };

  // render tassk
  itemListElm.insertAdjacentHTML('beforeend', itemMarkup(item));

  // save item
  const items = getStoredData(activeTabKey);
  items.push(item);

  localStorage.setItem(activeTabKey, JSON.stringify(items));

  // clear item input
  itemTitleInput.value = '';
}

function changeActiveTab(e) {
  const target = e.target;

  if (target.classList.contains('nav__tab')) {
    // remove old active-tab
    document.getElementById('active-tab').removeAttribute('id');

    // active clicked tab
    target.id = 'active-tab';

    // save active-tab
    const tabs = getStoredData('tabs');

    for (const tab of tabs) {
      // remove old active-tab from localstorage
      if (tab.active) delete tab.active;

      // active clicked tab to localstorage
      if (target.innerText === tab.name) {
        tab.active = true;
      }
    }

    localStorage.setItem('tabs', JSON.stringify(tabs));

    // reload tasks from new active tab
    const itemListElm = document.getElementById('item-list');
    itemListElm.innerHTML = generateItemsMarkup();
  }
}

export { getStoredData, getDate, addItem, changeActiveTab };
