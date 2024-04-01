import { taskListTemplate } from '/assets/js/modules/template.js';

window.addEventListener('DOMContentLoaded', async function () {
  const taskListElm = document.getElementById('task-list');
  const taskListName = 'daily-tasks';
  const taskList = await taskListTemplate(taskListName);

  taskListElm.innerHTML = taskList;
});
