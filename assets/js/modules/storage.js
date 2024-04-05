import { getDate } from '/assets/js/modules/functions.js';

class Storage {
  constructor() {
    const config = {
      groups: [],
      items: {},
      types: [
        { type: 'task', status: '', selected: true },
        { type: 'task', status: 'done' },
        { type: 'task', status: 'failed' },
        { type: 'note', status: '' },
      ],
      counters: {
        groups: 1,
        items: 1,
      },
    };

    const data = localStorage.getItem('config');
    this.config = data ? JSON.parse(data) : config;
  }

  saveConfig() {
    localStorage.setItem('config', JSON.stringify(this.config));
  }

  getGroupId() {
    return this.config.counters.groups++;
  }

  getItemId() {
    return this.config.counters.items++;
  }

  getGroups() {
    return this.config.groups;
  }

  getGroupItems() {
    return this.config.items[this.getActiveGroupId()] || [];
  }

  setGroupItems(items) {
    this.config.items[this.getActiveGroupId()] = items;
  }

  getActiveGroupId() {
    for (const group of this.config.groups) {
      if (group.active) return group.id;
    }
  }

  setActiveGroup(id) {
    for (const group of this.config.groups) {
      if (group.active) delete group.active;
      if (group.id === +id) group.active = true;
    }

    this.saveConfig();
  }

  newGroup(group) {
    if (group.active) {
      // remove active group
      for (const group of this.config.groups) {
        if (group.active) delete group.active;
      }
    }

    // add new group
    this.config.groups.push(group);
    this.saveConfig();
  }

  newItem(item) {
    let groupItems = this.getGroupItems();
    groupItems.push(item);

    this.setGroupItems(groupItems);
    this.saveConfig();
  }

  devConfig() {
    this.config = {
      groups: [],
      items: {},
      types: {
        task: {
          status: ['done', 'failed'],
        },
      },
      counters: {
        groups: 6,
        items: 9,
      },
    };

    const groups = [
      { name: 'Daily Tasks', id: 1, active: true },
      { name: 'Weekly Tasks', id: 2 },
      { name: 'Monthly Tasks', id: 3 },
      { name: 'Habits', id: 4 },
      { name: 'Routines', id: 5 },
    ];

    groups.forEach((group) => this.newGroup(group));

    this.config.items[1] = [
      { id: 1, type: 'task', created: getDate(), text: 'Normal Task' },
      { id: 2, type: 'task', created: getDate(), text: 'Normal Task' },
      { id: 3, type: 'task', created: getDate(), text: 'Task Done', status: 'done' },
      { id: 4, type: 'task', created: getDate(), text: 'Task Done', status: 'done' },
      { id: 5, type: 'task', created: getDate(), text: 'Task Failed', status: 'failed' },
      { id: 6, type: 'task', created: getDate(), text: 'Task Failed', status: 'failed' },
      { id: 7, type: 'note', created: getDate(), text: 'Note' },
      { id: 8, type: 'note', created: getDate(), text: 'Note' },
    ];

    this.saveConfig();
  }
}

export default Storage;
