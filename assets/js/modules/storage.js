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
      },
    };

    const data = localStorage.getItem('config');
    this.config = data ? JSON.parse(data) : config;
  }

  saveConfig() {
    localStorage.setItem('config', JSON.stringify(this.config));
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
      { type: 'task', created: getDate(), text: 'Normal Task' },
      { type: 'task', created: getDate(), text: 'Normal Task' },
      { type: 'task', created: getDate(), text: 'Task Done', status: 'done' },
      { type: 'task', created: getDate(), text: 'Task Done', status: 'done' },
      { type: 'task', created: getDate(), text: 'Task Failed', status: 'failed' },
      { type: 'task', created: getDate(), text: 'Task Failed', status: 'failed' },
      { type: 'note', created: getDate(), text: 'Note' },
      { type: 'note', created: getDate(), text: 'Note' },
    ];

    this.saveConfig();
  }
}

export default Storage;
