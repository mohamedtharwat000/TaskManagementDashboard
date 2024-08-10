import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import initialState from './initialState';

const globalsSlice = createSlice({
  name: 'globals',
  initialState,
  reducers: {
    toggleTheme: (state) => {
      const theme = state.theme === 'light' ? 'dark' : 'light';
      state.theme = theme;
      document.body.setAttribute('data-bs-theme', theme);
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    setSuccess: (state, action: PayloadAction<string>) => {
      state.success = action.payload;
    },
    setSort: (
      state,
      action: PayloadAction<{
        by?: 'noSort' | 'creationDate' | 'dueDate';
        direction?: 'asc' | 'desc';
      }>,
    ) => {
      state.sort = { ...state.sort, ...action.payload };
    },
    setFilter: (
      state,
      action: PayloadAction<{
        status?: 'all' | 'completed' | 'incomplete';
        priority?: 'all' | 'high' | 'low';
      }>,
    ) => {
      state.filter = { ...state.filter, ...action.payload };
    },
  },
});

export const { toggleTheme, setError, setSuccess, setSort, setFilter } =
  globalsSlice.actions;

export default globalsSlice;
