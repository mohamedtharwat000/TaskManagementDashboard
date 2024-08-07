import Task from './Task';

export default interface State {
  tasks: Task[];
  clientTasks: Task[];
  activeTask: Task | null;
  search: string;
  filterBy: {
    status: '' | 'completed' | 'incomplete';
    priority: 0 | -1 | 1;
    tags: string[];
  };
  sortBy: 'dueDate' | 'priority' | 'creationDate';
}
