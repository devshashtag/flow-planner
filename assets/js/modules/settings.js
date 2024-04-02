class Settings {
  constructor() {
    this.config = this.load();
  }

  load() {
    const defaultConfig = {
      counter: {
        groups: 1,
        items: 1,
      },
      groups: [],
      types: {
        task: {
          status: ['done', 'failed'],
        },
      },
      items: {},
    };

    const data = localStorage.getItem('config');
    return data ? JSON.parse(data) : defaultConfig;
  }

  save() {
    localStorage.setItem('config', JSON.stringify(this.config));
  }

  changeGroup(id) {
    for (const group of this.config.groups) {
      if (group.active) delete group.active;
      if (group.id === id) group.active = true;
    }

    this.save();
  }

  getGroupId() {
    for (const group of this.config.groups) {
      if (group.active) return group.id;
    }
  }

  getGroups() {
    return this.config.groups;
  }

  getItems() {
    return this.config.items[this.getGroupId()] || [];
  }

  pushItem(item) {
    let items = this.getItems();
    items.push(item);

    this.config.items[this.getGroupId()] = items;
    this.save();
  }
}

export default Settings;
