import React, { memo, useEffect, useCallback } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import axios, { AxiosResponse } from 'axios';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import useReduxState from '../store/hooks/useReduxState';
import { setError, setSuccess } from '../store/slices/globals';
import { setTasks } from '../store/slices/taskManagement';
import Task from '../types/Task';
import TaskItem from './TaskItem';

const TaskList: React.FC = () => {
  const [userTasks, dispatch] = useReduxState(
    (state) => state.taskManagement.userTasks,
  );

  const moveTask = useCallback(
    (dragIndex: number, hoverIndex: number) => {
      const updatedTasks = [...userTasks];
      const [movedTask] = updatedTasks.splice(dragIndex, 1);
      updatedTasks.splice(hoverIndex, 0, movedTask);
      dispatch(setTasks(JSON.stringify(updatedTasks)));
    },
    [userTasks, dispatch],
  );

  useEffect(() => {
    (async function fetchData() {
      const localTasks = localStorage.getItem('userTasks');
      if (localTasks) dispatch(setTasks(localTasks));
      dispatch(setSuccess('Tasks loaded successfully!'));
      axios
        .get('https://jsonplaceholder.typicode.com/todos')
        .then((response: AxiosResponse<Task[]>) => {
          const fetchedTasks = response.data
            .slice(0, 10)
            .map((task) => new Task(task));
          dispatch(setTasks(JSON.stringify(fetchedTasks)));
          dispatch(setSuccess('Tasks synced successfully!'));
        })
        .catch((error) => {
          dispatch(setError(error.message));
        });
    })();
  }, [dispatch]);

  return (
    <DndProvider backend={HTML5Backend}>
      <Container>
        <Row className="py-4 g-4">
          {userTasks.length !== 0 ? (
            userTasks.map((task: Task, index: number) => (
              <Col
                className="d-flex justify-content-center"
                key={task.id}
                sm={12}
                md={6}
                xl={4}
              >
                <TaskItem
                  taskData={task}
                  index={index}
                  moveTask={moveTask}
                />
              </Col>
            ))
          ) : (
            <Col className="d-flex justify-content-center">
              <div className="text-center">
                <h3>No tasks available</h3>
                <p>Enjoy your free time or add a new task!</p>
              </div>
            </Col>
          )}
        </Row>
      </Container>
    </DndProvider>
  );
};

export default memo(TaskList);
