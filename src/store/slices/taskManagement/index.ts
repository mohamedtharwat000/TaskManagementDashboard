import TaskManagementSlice from './taskManagementSlice';

export const {
  addTask,
  editTask,
  deleteTask,
  toggleTask,
  searchTasks,
  filterTasks,
  sortTasks,
  setTasks,
} = TaskManagementSlice.actions;

export default TaskManagementSlice;
