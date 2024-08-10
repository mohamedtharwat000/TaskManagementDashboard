import React from 'react';
import { FormControl } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { searchTasks } from '../store/slices/taskManagement';

const SearchBar: React.FC = () => {
  const dispatch = useDispatch();

  return (
    <FormControl
      type="search"
      placeholder="Search tasks..."
      onChange={(e) => {
        e.preventDefault();
        dispatch(searchTasks({ search: e.target.value }));
      }}
    />
  );
};

export default SearchBar;
