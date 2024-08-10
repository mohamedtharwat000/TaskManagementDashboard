import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import Task from '../../../types/Task';
import initialState from './initialState';

const fromJSON = <T>(payload: string): T => JSON.parse(payload);

const TaskManagementSlice = createSlice({
  name: 'TaskManagement',
  initialState,
  reducers: {
    setTasks: (state, action: PayloadAction<string>) => {
      const tasks: Task[] = fromJSON<Task[]>(action.payload);
      state.allTasks = tasks;
      state.userTasks = tasks;
    },

    addTask: (state, action: PayloadAction<string>) => {
      const taskToAdd: Task = fromJSON<Task>(action.payload);
      taskToAdd.dueDate = taskToAdd.dueDate
        ? new Date(taskToAdd.dueDate).getTime().toString()
        : '';

      state.allTasks.push(taskToAdd);
      state.userTasks.push(taskToAdd);
    },

    deleteTask: (state, action: PayloadAction<string>) => {
      const taskToDelete: Task = fromJSON<Task>(action.payload);
      state.allTasks = state.allTasks.filter(
        (task) => task.id !== taskToDelete.id,
      );
      state.userTasks = state.userTasks.filter(
        (task) => task.id !== taskToDelete.id,
      );
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

      if (status) {
        if (status === 'all') {
          state.userTasks = state.allTasks;
        }

        if (status === 'completed') {
          state.userTasks = state.allTasks.filter((task) => {
            return task.completed === true;
          });
        }

        if (status === 'incomplete') {
          state.userTasks = state.allTasks.filter((task) => {
            return task.completed === false;
          });
        }
      }

      if (priority) {
        if (priority === 'all') {
          state.userTasks = state.allTasks;
        }

        if (priority === 'high') {
          state.userTasks = state.allTasks.filter((task) => {
            return task.priority === 'high';
          });
        }

        if (priority === 'low') {
          state.userTasks = state.allTasks.filter((task) => {
            return task.priority === 'low';
          });
        }
      }
    },
  },
});

export default TaskManagementSlice;
