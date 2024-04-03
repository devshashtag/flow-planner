class Settings {
  constructor() {
    this.config = this.load();
  }

  load() {
    const defaultConfig = {
      groups: [],
      items: {},
      types: {
        task: {
          status: ['done', 'failed'],
        },
      },
      counter: {
        groups: 1,
      },
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
      if (group.id === +id) group.active = true;
    }

    this.save();
  }

  getGroupId() {
    for (const group of this.config.groups) {
      if (group.active) return +group.id;
    }
  }

  getGroups() {
    return this.config.groups;
  }

  getItems() {
    return this.config.items[this.getGroupId()] || [];
  }

  pushGroup(group) {
    if (group.active) {
      // remove active group
      for (const group of this.config.groups) {
        if (group.active) delete group.active;
      }
    }

    this.config.groups.push(group);
    this.save();
  }

  pushItem(item) {
    let items = this.getItems();
    items.push(item);

    this.config.items[this.getGroupId()] = items;
    this.save();
  }
}

export default Settings;
