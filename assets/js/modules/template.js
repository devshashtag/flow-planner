async function taskListTemplate(taskListName) {
  const taskList = JSON.parse(localStorage.getItem(taskListName)) ?? [];
  const template = taskList.map((task) => taskTemplate(task)).join('');

  return template;
}

function taskTemplate(task) {
  return String.raw`
    <!-- item -->
    <li class="list__item type__${task.type}" data-time="${task?.time?.split(' ')[1] ?? '!'}">
      <div class="task__text">${task.title}</div>
    </li>
  `;
}

export { taskListTemplate };
