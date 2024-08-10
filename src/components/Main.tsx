import React from 'react';
import MainBar from './MainBar';
import TaskList from './TaskList';
import NotificationAlert from './Alert';

const Main: React.FC = () => {
  return (
    <div style={{ minWidth: '400px' }}>
      <NotificationAlert />
      <MainBar />
      <TaskList />
    </div>
  );
};

export default Main;
