import TaskManagementState from '../types/TaskManagementState';

const initialState: TaskManagementState = {
  clientTasks: [],
  tasks: [],
  search: '',
  activeTask: null,
  filterBy: {
    status: '',
    priority: 0,
    tags: [],
  },
  sortBy: 'creationDate',
};

export default initialState;
