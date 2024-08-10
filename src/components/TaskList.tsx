import React, { useEffect } from 'react';
import axios, { AxiosResponse } from 'axios';
import { Container, Row, Col } from 'react-bootstrap';
import TaskItem from './TaskItem';
import useReduxState from '../store/hooks/useReduxState';
import { setError } from '../store/slices/globals';
import { setTasks } from '../store/slices/taskManagement';
import Task from '../types/Task';

const TaskList: React.FC = () => {
  const [userTasks, dispatch] = useReduxState(
    (state) => state.taskManagement.userTasks,
  );

  useEffect(() => {
    (async function fetchData() {
      axios
        .get('https://jsonplaceholder.typicode.com/todos')
        .then((response: AxiosResponse<Task[]>) => {
          let tasks = response.data.slice(0, 10);
          tasks = tasks.map((task) => {
            return new Task(task);
          });
          const tasksString = JSON.stringify(tasks);
          localStorage.setItem('tasks', tasksString);
          dispatch(setTasks(tasksString));
        })
        .catch((error) => {
          dispatch(setError(error.message));
        });
    })();
  }, [dispatch]);

  return (
    <Container style={{ minHeight: '80vh' }}>
      <Row className="py-4 g-4">
        {userTasks.length !== 0 ? (
          userTasks.map((task: Task) => (
            <Col
              key={Number(Math.random().toString().slice(2, 8))}
              sm={12}
              lg={6}
              xxl={4}
              className="d-flex justify-content-center"
            >
              <TaskItem taskData={task} />
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
  );
};

export default TaskList;
