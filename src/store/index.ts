import { configureStore } from '@reduxjs/toolkit';

import taskManagementReducer from './slices/taskManagement';
import globalsReducer from './slices/globals';

const store = configureStore({
  reducer: {
    taskManagement: taskManagementReducer.reducer,
    globals: globalsReducer.reducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
