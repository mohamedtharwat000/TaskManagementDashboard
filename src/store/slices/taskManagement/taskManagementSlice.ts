import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import Task from '../../../types/Task';
import initialState from './initialState';
import updateClientTasks from '../../utils/updateClientTasks';

const fromJSON = <T>(payload: string): T => JSON.parse(payload);

const TaskManagementSlice = createSlice({
  name: 'TaskManagement',
  initialState,
  reducers: {
    setTasks: (state, actions: PayloadAction<string>) => {
      const tasks: Task[] = fromJSON<Task[]>(actions.payload);
      state.allTasks = tasks;
      state.userTasks = tasks;
    },

    addTask: (state, actions: PayloadAction<string>) => {
      const taskToAdd: Task = fromJSON<Task>(actions.payload);
      taskToAdd.dueDate = taskToAdd.dueDate
        ? new Date(taskToAdd.dueDate).getTime().toString()
        : '';

      state.allTasks.push(taskToAdd);
      state.userTasks = updateClientTasks({ type: 'add', state });
    },

    deleteTask: (state, actions: PayloadAction<string>) => {
      const taskToDelete: Task = fromJSON<Task>(actions.payload);
      state.allTasks = state.allTasks.filter(
        (task) => task.id !== taskToDelete.id,
      );
      state.userTasks = updateClientTasks({ type: 'delete', state });
    },

    editTask: (state, actions: PayloadAction<string>) => {
      const dataToEdit: Task = fromJSON<Task>(actions.payload);
      const taskToEdit = state.allTasks.find(
        (task) => task.id === dataToEdit.id,
      );

      if (taskToEdit) Object.assign(taskToEdit, dataToEdit);
      state.userTasks = updateClientTasks({ type: 'edit', state });
    },

    toggleTask: (state, actions: PayloadAction<string>) => {
      const taskToToggle: Task = fromJSON<Task>(actions.payload);
      const task = state.allTasks.find((task) => task.id === taskToToggle.id);
      if (task) task.completed = !task.completed;
      state.userTasks = updateClientTasks({ type: 'toggle', state });
    },

    searchTasks: (state, actions: PayloadAction<{ search: string }>) => {
      const search = actions.payload.search.toLocaleLowerCase();
      state.userTasks = updateClientTasks({
        type: 'search',
        state,
        payload: { search },
      });
    },

    sortTasks: (
      state,
      actions: PayloadAction<{
        by: 'noSort' | 'dueDate' | 'creationDate';
        direction: 'asc' | 'desc';
      }>,
    ) => {
      const { by, direction } = actions.payload;

      state.userTasks = updateClientTasks({
        type: 'sort',
        state,
        payload: { by, direction },
      });
    },

    filterTasks: (
      state,
      actions: PayloadAction<{
        status: 'all' | 'completed' | 'incomplete';
        priority: 'normal' | 'high' | 'low';
      }>,
    ) => {
      const { status, priority } = actions.payload;
      state.userTasks = updateClientTasks({
        type: 'filter',
        state,
        payload: { status, priority },
      });
    },
  },
});

export default TaskManagementSlice;
