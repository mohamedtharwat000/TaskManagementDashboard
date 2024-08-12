import React, { memo } from 'react';
import MainBar from './MainBar';
import TaskList from './TaskList';
import NotificationAlert from './Alert';

const Main: React.FC = () => {
  return (
    <>
      <NotificationAlert />
      <MainBar />
      <TaskList />
    </>
  );
};

export default memo(Main);
