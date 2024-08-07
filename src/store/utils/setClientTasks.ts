import TaskManagementState from '../../types/TaskManagementState';

const setClientTasks = (state: TaskManagementState) => {
  let clientTasks = state.tasks;
  if (state.search) {
    clientTasks = clientTasks.filter((task) =>
      task.title.toLowerCase().includes(state.search.toLowerCase()),
    );
  }

  if (state.filterBy.status) {
    clientTasks = clientTasks.filter((task) =>
      state.filterBy.status === 'completed' ? task.completed : !task.completed,
    );
  }

  if (state.filterBy.priority) {
    clientTasks = clientTasks.filter(
      (task) => task.priority === state.filterBy.priority,
    );
  }

  if (state.filterBy.tags.length) {
    clientTasks = clientTasks.filter((task) =>
      state.filterBy.tags.every((tag) => task.tags.includes(tag)),
    );
  }

  if (state.sortBy === 'creationDate') {
    clientTasks = clientTasks.sort(
      (a, b) => parseInt(a.creationDate) - parseInt(b.creationDate),
    );
  }

  if (state.sortBy === 'dueDate') {
    clientTasks = clientTasks.sort(
      (a, b) => parseInt(a.dueDate) - parseInt(b.dueDate),
    );
  }

  if (state.sortBy === 'priority') {
    clientTasks = clientTasks.sort((a, b) => {
      return a.priority - b.priority;
    });
  }

  return clientTasks;
};

export default setClientTasks;
