import { getDate } from '/assets/js/modules/functions.js';
import { storage } from '/assets/js/index.js';

class Interface {
  constructor() {
    // groups
    this.groupsList = document.getElementById('groups-list');
    this.groupName = document.getElementById('group-name');
    this.groupBtn = document.getElementById('group-btn');

    // items
    this.itemsList = document.getElementById('items-list');
    this.itemText = document.getElementById('item-text');
    this.itemType = document.getElementById('item-type');
    this.itemTypeList = document.getElementById('type-list');
    this.itemBtn = document.getElementById('item-btn');

    // show groups, items
    this.updateGroupsList();
    this.updateItemsList();

    // events
    // add group
    this.groupBtn.addEventListener('click', this.newGroup);

    // add item
    this.itemBtn.addEventListener('click', this.newItem);
    this.itemTypeList.addEventListener('click', this.changeItemType);
    this.itemText.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        this.newItem();
      }
    });

    // change active group
    this.groupsList.addEventListener('click', this.changeActiveGroup);
  }

  // group list
  updateGroupsList() {
    this.groupsList.replaceChildren(...this.getGroupElements());
  }

  // group input
  hideGroupName() {
    // change btn to close
    this.groupBtn.classList.remove('btn-close');

    // hide group name
    this.groupName.classList.remove('input-show');
    this.groupName.innerText = '';
    this.itemText.focus();
  }

  showGroupName() {
    // change btn to open
    this.groupBtn.classList.add('btn-close');

    // show group name
    this.groupName.classList.add('input-show');
    setTimeout(() => this.groupName.focus(), 50);
  }

  // items list
  updateItemsList() {
    this.itemsList.replaceChildren(...this.getItemElements());
    this.itemText.focus();
  }

  // active group
  changeActiveGroup = (e) => {
    const target = e.target;

    if (target.classList.contains('list__group')) {
      // remove old active-group
      document.getElementById('group-active')?.removeAttribute('id');

      // active clicked group
      target.id = 'group-active';

      // save active group
      storage.setActiveGroup(target.dataset.id);

      // reload items from new active group
      this.updateGroupsList();
      this.updateItemsList();
    }
  };

  // item type
  changeItemType = (e) => {
    const target = e.target.tagName.toLowerCase() === 'li' ? e.target : e.target.parentNode;

    if (target.classList.contains('list__item')) {
      const classList = Array.from(target.classList);
      classList.shift();

      this.itemType.className = '';
      this.itemType.classList.add(...classList);
      this.itemType.innerText = target.innerText.trim();

      // hide list for a short time
      this.itemTypeList.classList.add('list__hide');
      setTimeout(() => this.itemTypeList.classList.remove('list__hide'), 200);

      // focus on item text
      this.itemText.focus();
    }
  };

  // new group
  newGroup = (event) => {
    let target = event.target;
    if (target.tagName.toLowerCase() === 'span') target = target.parentNode;

    // runs when close btn clicked
    if (target.classList.contains('btn-close')) {
      this.hideGroupName();
      return;
    }

    // get userinput
    this.showGroupName();

    this.groupName.addEventListener('keydown', (e) => {
      const name = this.groupName.innerText.trim();

      // if pressed key is 'Enter' and groupName is not empty
      if (e.key === 'Enter' && name !== '') {
        // prevent key
        e.preventDefault();

        // hide input
        this.hideGroupName();

        // add new group
        const group = {
          name: name,
          id: storage.getGroupId(),
          active: true,
        };

        storage.newGroup(group);

        // reload groups and it's items after adding new group
        this.updateGroupsList();
        this.updateItemsList();
      }
    });
  };

  // new item
  newItem = () => {
    const date = getDate();
    const groupId = storage.getActiveGroupId();
    const text = this.itemText.innerText.trim();
    const type = this.itemType.className.match(/type__(\w+)/)[1];
    let status = this.itemType.className.match(/status__(\w+)/);
    status = status ? status[1] : '';

    // focus text input
    this.itemText.focus();

    // if input or group-id is empty dont add new item
    if (!text || !groupId) return;

    // new item
    const item = {
      id: storage.getItemId(),
      text: text,
      type: type,
      status: status,
      created: date,
    };

    // save item
    storage.newItem(item);

    // add item to items list
    const element = this.getItemElement(item);
    this.itemsList.appendChild(element);

    // scroll to new item
    element.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'nearest' });

    // clear text input
    this.itemText.innerText = '';
  };

  // templates
  getGroupElement(group) {
    const element = document.createElement('li');
    element.classList.add('list__group');
    element.dataset.id = group.id;
    element.innerText = group.name;
    if (group.active) element.id = 'group-active';

    return element;
  }

  getItemElement(item) {
    const element = document.createElement('li');
    const textElement = document.createElement('div');

    // classes
    element.classList.add('list__item');
    element.classList.add(`type__${item.type}`);
    if (item.status) element.classList.add(`${item.type}--${item.status}`);
    textElement.classList.add('item__text');

    // item data
    element.dataset.time = item.created.time;
    element.dataset.date = item.created.date;
    element.dataset.id = item.id;

    // text
    textElement.innerText = item.text;

    // add text to element
    element.appendChild(textElement);

    return element;
  }

  getGroupElements() {
    const groups = storage.getGroups();
    return groups.map(this.getGroupElement);
  }

  getItemElements() {
    const items = storage.getGroupItems();
    return items.map(this.getItemElement);
  }
}

export default Interface;
