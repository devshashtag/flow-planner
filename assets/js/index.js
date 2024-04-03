import { getGroupElements, getItemElements } from '/assets/js/modules/template.js';
import { addGroup, addItem, changeActiveGroup } from '/assets/js/modules/functions.js';
import Storage from '/assets/js/modules/storage.js';

export const storage = new Storage();

window.addEventListener('DOMContentLoaded', function () {
  const addItemBtn = document.getElementById('item-add');
  const itemTitleInput = document.getElementById('item-title');
  const addGroupBtn = document.getElementById('group-add');
  const groupListElm = document.getElementById('group-list');
  const itemListElm = document.getElementById('item-list');

  // load groups, items
  groupListElm.replaceChildren(...getGroupElements());
  itemListElm.replaceChildren(...getItemElements());

  // add group
  addGroupBtn.addEventListener('click', addGroup);

  // add item
  addItemBtn.addEventListener('click', addItem);
  itemTitleInput.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') addItem();
  });

  // change active group
  groupListElm.addEventListener('click', changeActiveGroup);
});
