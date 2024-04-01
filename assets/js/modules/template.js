import { getStoredData } from '/assets/js/modules/functions.js';

function tabMarkup(tab) {
  const tabName = tab.name;
  const tabKey = tabName.replace(/\s+/g, '-').toLowerCase();
  const isActive = tab.active ? ' id="active-tab"' : '';

  return `
      <!-- tab -->
      <li class="nav__tab"${isActive} data-key="${tabKey}">${tabName}</li>
    `;
}

const itemMarkup = function (item) {
  const status = item?.status ? ` ${item.type}--${item.status}` : '';

  return `
    <!-- item -->
    <li class="list__item type__${item.type}${status}" data-content="${item.created.time}">
      <div class="item__text">${item.title}</div>
    </li>
  `;
};

function generateTabsMarkup(key = 'tabs') {
  const data = getStoredData(key);
  return data.map(tabMarkup).join('');
}

function generateItemsMarkup() {
  const activeTabKey = document.getElementById('active-tab').dataset.key;
  const data = getStoredData(activeTabKey);
  return data.map(itemMarkup).join('');
}

export { generateTabsMarkup, generateItemsMarkup, tabMarkup, itemMarkup };
