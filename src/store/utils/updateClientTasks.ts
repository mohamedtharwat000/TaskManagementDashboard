import Task from '../../types/Task';
import TaskManagement from '../../types/TaskManagement';

interface UpdateClientTasksParams {
  type: string;
  state: TaskManagement;
  payload?: {
    search?: string;
    by?: 'noSort' | 'creationDate' | 'dueDate';
    direction?: 'asc' | 'desc';
    status?: 'all' | 'completed' | 'incomplete';
    priority?: 'normal' | 'high' | 'low';
  };
}

const updateClientTasks = ({
  type,
  state,
  payload = {},
}: UpdateClientTasksParams): Task[] => {
  let clientTasks = [...state.allTasks];

  switch (type) {
    case 'search':
      if (payload.search) {
        clientTasks = clientTasks.filter(
          (task) =>
            task.title.toLowerCase().includes(payload.search as string) ||
            task.tags.includes(payload.search as string),
        );
      }
      break;

    case 'sort':
      if (payload.by && payload.direction) {
        const dateKey =
          payload.by === 'creationDate' ? 'creationDate' : 'dueDate';
        clientTasks.sort((a, b) =>
          payload.direction === 'asc'
            ? parseInt(a[dateKey]) - parseInt(b[dateKey])
            : parseInt(b[dateKey]) - parseInt(a[dateKey]),
        );
      }
      break;

    case 'filter':
      if (payload.status && payload.status !== 'all') {
        clientTasks = clientTasks.filter((task) =>
          payload.status === 'completed' ? task.completed : !task.completed,
        );
      }

      if (payload.priority) {
        clientTasks = clientTasks.filter(
          (task) => task.priority === payload.priority,
        );
      }
      break;

    default:
      break;
  }

  return clientTasks;
};

export default updateClientTasks;
