import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import Task from '../../../types/Task';
import initialState from './initialState';

const fromJSON = <T>(payload: string): T => JSON.parse(payload);
const saveToLocalStorage = (tasks: Task[]): void => {
  const localTasks = localStorage.getItem('tasks');
  if (localTasks) {
    const parsedLocalTasks = fromJSON<Task[]>(localTasks);
    localStorage.setItem(
      'tasks',
      JSON.stringify({ ...parsedLocalTasks, ...tasks }),
    );
  } else {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }
};

const TaskManagementSlice = createSlice({
  name: 'TaskManagement',
  initialState,
  reducers: {
    setTasks: (state, action: PayloadAction<string>) => {
      const tasks: Task[] = fromJSON<Task[]>(action.payload);
      state.allTasks = tasks;
      state.userTasks = tasks;

      saveToLocalStorage(state.allTasks);
    },

    addTask: (state, action: PayloadAction<string>) => {
      const taskToAdd: Task = fromJSON<Task>(action.payload);
      if (!state.allTasks.includes(taskToAdd)) {
        state.allTasks.unshift(taskToAdd);
      }

      if (!state.userTasks.includes(taskToAdd)) {
        state.userTasks.unshift(taskToAdd);
      }

      saveToLocalStorage(state.allTasks);
    },

    deleteTask: (state, action: PayloadAction<string>) => {
      const taskToDelete: Task = fromJSON<Task>(action.payload);
      state.allTasks = state.allTasks.filter(
        (task) => task.id !== taskToDelete.id,
      );
      state.userTasks = state.userTasks.filter(
        (task) => task.id !== taskToDelete.id,
      );

      saveToLocalStorage(state.allTasks);
    },

    editTask: (state, action: PayloadAction<string>) => {
      const dataToEdit: Task = fromJSON<Task>(action.payload);
      const taskToEdit = state.allTasks.find(
        (task) => task.id === dataToEdit.id,
      );
      if (taskToEdit) {
        const index = state.allTasks.indexOf(taskToEdit);
        state.allTasks[index] = { ...taskToEdit, ...dataToEdit };
        state.userTasks[index] = { ...taskToEdit, ...dataToEdit };
      }

      saveToLocalStorage(state.allTasks);
    },

    toggleTask: (state, action: PayloadAction<string>) => {
      const taskToToggle: Task = fromJSON<Task>(action.payload);
      const taskFromAll = state.allTasks.find(
        (task) => task.id === taskToToggle.id,
      );
      if (taskFromAll) taskFromAll.completed = !taskFromAll.completed;
      const taskFromUser = state.userTasks.find(
        (task) => task.id === taskToToggle.id,
      );
      if (taskFromUser) taskFromUser.completed = !taskFromUser.completed;

      saveToLocalStorage(state.allTasks);
    },

    searchTasks: (state, action: PayloadAction<{ search: string }>) => {
      const search = action.payload.search.toLowerCase();
      state.userTasks = state.allTasks.filter(
        (task) =>
          task.title.toLowerCase().includes(search) ||
          task.tags.some((tag) => tag.toLowerCase().includes(search)),
      );
    },

    sortTasks: (
      state,
      action: PayloadAction<{
        by: 'dueDate' | 'creationDate';
        direction: 'asc' | 'desc';
      }>,
    ) => {
      const { by, direction } = action.payload;

      state.userTasks = state.userTasks.sort((a, b) => {
        const aValue = parseInt(a[by]) || 0;
        const bValue = parseInt(b[by]) || 0;
        return direction === 'asc' ? aValue - bValue : bValue - aValue;
      });
    },

    filterTasks: (
      state,
      action: PayloadAction<{
        status?: 'all' | 'completed' | 'incomplete';
        priority?: 'all' | 'high' | 'low';
      }>,
    ) => {
      const { status, priority } = action.payload;

      let filteredTasks = state.allTasks;

      if (status) {
        if (status === 'completed') {
          filteredTasks = filteredTasks.filter((task) => {
            return task.completed === true;
          });
        }

        if (status === 'incomplete') {
          filteredTasks = filteredTasks.filter((task) => {
            return task.completed === false;
          });
        }
      }

      if (priority) {
        if (priority === 'high') {
          filteredTasks = filteredTasks.filter((task) => {
            return task.priority === 'high';
          });
        }

        if (priority === 'low') {
          filteredTasks = filteredTasks.filter((task) => {
            return task.priority === 'low';
          });
        }
      }

      state.userTasks = filteredTasks;
    },
  },
});

export default TaskManagementSlice;
