import { generateTabsMarkup, generateItemsMarkup } from '/assets/js/modules/template.js';
import { addItem, changeActiveTab } from '/assets/js/modules/functions.js';

window.addEventListener('DOMContentLoaded', function () {
  const itemAddBtn = document.getElementById('item-add');
  const tabListElm = document.getElementById('tab-list');
  const itemListElm = document.getElementById('item-list');

  // load tabs, items
  tabListElm.innerHTML = generateTabsMarkup();
  itemListElm.innerHTML = generateItemsMarkup();

  // add item listener
  itemAddBtn.addEventListener('click', addItem);

  // change active tab
  tabListElm.addEventListener('click', changeActiveTab);
});
