import { getGroupElements, getItemElements } from '/assets/js/modules/template.js';
import { addItem, changeActiveGroup } from '/assets/js/modules/functions.js';
import Settings from '/assets/js/modules/settings.js';

export const settings = new Settings();

window.addEventListener('DOMContentLoaded', function () {
  const itemAddBtn = document.getElementById('item-add');
  const groupListElm = document.getElementById('group-list');
  const itemListElm = document.getElementById('item-list');

  // load groups, items
  groupListElm.replaceChildren(...getGroupElements());
  itemListElm.replaceChildren(...getItemElements());

  // add item listener
  itemAddBtn.addEventListener('click', addItem);
  // change active group
  groupListElm.addEventListener('click', changeActiveGroup);
});
