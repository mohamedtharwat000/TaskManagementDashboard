import React, { useState } from 'react';
import {
  Card,
  Button,
  Form,
  Badge,
  Container,
  Row,
  Modal,
} from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { deleteTask, toggleTask } from '../store/slices/taskManagement';
import Task from '../types/Task';
import TaskForm from './TaskForm';
import TaskDetailsModal from './TaskDetailsModal';
import axios from 'axios';
import { setError, setSuccess } from '../store/slices/globals';

const TaskItem: React.FC<{ taskData: Task }> = ({ taskData }) => {
  const dispatch = useDispatch();

  const [taskFormShow, setTaskFormShow] = useState(false);
  const toggleTaskForm = () => setTaskFormShow(!taskFormShow);

  const [taskDetailsShow, setTaskDetailsShow] = useState(false);
  const toggleTaskDetails = () => setTaskDetailsShow(!taskDetailsShow);

  const dueDateString = taskData.dueDate
    ? new Date(Number(taskData.dueDate)).toDateString()
    : 'No Due Date';
  const creationDateString = new Date(
    Number(taskData.creationDate),
  ).toDateString();

  const handleDeleteTask = () => {
    dispatch(deleteTask(JSON.stringify(taskData)));
    axios
      .delete(`https://jsonplaceholder.typicode.com/todos/${taskData.id}`)
      .then(() => {
        dispatch(setSuccess('Task deleted successfully'));
      })
      .catch((err) => {
        dispatch(setError(err.message));
      });
    const localTasks: Task[] = JSON.parse(
      localStorage.getItem('tasks') as string,
    );
    const updatedTasks = localTasks.filter(
      (task: Task) => task.id !== taskData.id,
    );
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  };

  return (
    <>
      <Card
        className="shadow-lg rounded-4 flex-shrink-0"
        style={{ width: '400px' }}
      >
        <Card.Body>
          <Card.Title
            className="fs-4 text-nowrap overflow-hidden text-truncate"
            title={taskData.title}
          >
            {taskData.title}
          </Card.Title>

          <Container className="d-flex flex-column justify-content-start align-items-start fs-6 my-2">
            <div className="text-muted">Due Date: {dueDateString}</div>
            <div className="text-muted">Created Date: {creationDateString}</div>
          </Container>

          <Container>
            <Row className="flex-nowrap overflow-auto">
              <Badge
                className="bg-dark"
                style={{ maxWidth: 'fit-content', margin: '2px' }}
              >
                {taskData.priority}
              </Badge>
              {taskData.tags.map((tag, index) => (
                <Badge
                  key={index}
                  className="bg-dark"
                  style={{ maxWidth: 'fit-content', margin: '2px' }}
                >
                  {tag}
                </Badge>
              ))}
            </Row>
          </Container>

          <Container className="d-flex justify-content-between align-items-center my-3">
            <Form.Check
              type="switch"
              label="checked"
              checked={taskData.completed}
              onChange={() => {
                dispatch(toggleTask(JSON.stringify(taskData)));
              }}
            />
            <Container className="d-flex justify-content-center align-items-center text-center">
              <Button
                variant="info"
                className="me-2"
                onClick={() => toggleTaskDetails()}
              >
                Details
              </Button>
              <Button
                variant="success"
                className="me-2"
                onClick={() => toggleTaskForm()}
              >
                Edit
              </Button>
              <Button
                variant="danger"
                onClick={() => {
                  handleDeleteTask();
                }}
              >
                Delete
              </Button>
            </Container>
          </Container>
        </Card.Body>
      </Card>

      <TaskDetailsModal
        show={taskDetailsShow}
        onHide={toggleTaskDetails}
        taskData={taskData}
      />

      <Modal
        show={taskFormShow}
        onHide={() => {
          toggleTaskForm();
        }}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <TaskForm
            toggleTaskForm={toggleTaskForm}
            task={taskData}
          />
        </Modal.Body>
      </Modal>
    </>
  );
};

export default TaskItem;
