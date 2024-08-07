import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import TaskManagementState from '../types/TaskManagementState';
import Task from '../types/Task';
import initialState from './initialState';
import setClientTasks from './utils/setClientTasks';

const taskSlice = createSlice({
  name: 'TaskManagementState',
  initialState,
  reducers: {
    addTask: (state, actions: PayloadAction<Task>) => {
      state.tasks.push(actions.payload);
      state.clientTasks = setClientTasks(state);
    },
    editTask: (state, actions: PayloadAction<Task['id']>) => {
      const task = state.tasks.find((task) => task.id === actions.payload);
      if (task) {
        Object.assign(task, actions.payload);
      }
      state.clientTasks = setClientTasks(state);
    },
    deleteTask: (state, actions: PayloadAction<Task['id']>) => {
      state.tasks = state.tasks.filter((task) => task.id !== actions.payload);
      state.clientTasks = setClientTasks(state);
    },
    toggleTask: (state, actions: PayloadAction<Task['id']>) => {
      const task = state.tasks.find((task) => task.id === actions.payload);
      if (task) {
        task.completed = !task.completed;
      }
    },
    searchTasks: (
      state,
      actions: PayloadAction<TaskManagementState['search']>,
    ) => {
      state.search = actions.payload;
      state.clientTasks = setClientTasks(state);
    },
    filterTasks: (
      state,
      actions: PayloadAction<TaskManagementState['filterBy']>,
    ) => {
      state.filterBy = actions.payload;
      state.clientTasks = setClientTasks(state);
    },
    sortTasks: (
      state,
      actions: PayloadAction<TaskManagementState['sortBy']>,
    ) => {
      state.sortBy = actions.payload;
      state.clientTasks = setClientTasks(state);
    },
  },
});

export default taskSlice;
