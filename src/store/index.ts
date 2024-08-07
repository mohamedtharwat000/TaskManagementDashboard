import { configureStore } from '@reduxjs/toolkit';
import taskSlice from './slice';
import useReduxState from './hooks/useReduxState';

const store = configureStore({
  reducer: {
    taskManagement: taskSlice.reducer,
  },
});

export default store;

export const {
  addTask,
  editTask,
  deleteTask,
  toggleTask,
  searchTasks,
  filterTasks,
  sortTasks,
} = taskSlice.actions;

export const useState = useReduxState;

export type RootState = ReturnType<typeof store.getState>;
export type StateDispatch = typeof store.dispatch;
