import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { Container, Row, Form, Button, Col } from 'react-bootstrap';
import Task from '../types/Task';
import { addTask, editTask } from '../store/slices/taskManagement';
import { setError, setSuccess } from '../store/slices/globals';

interface TaskFormProps {
  toggleTaskForm: () => void;
  task?: Task;
}

const TaskForm: React.FC<TaskFormProps> = ({ toggleTaskForm, task }) => {
  const dispatch = useDispatch();
  const [taskData, setTaskData] = useState(
    task
      ? { ...task }
      : {
          ...new Task({}),
          id: '',
        },
  );

  const [tagInput, setTagInput] = useState('');

  const handleTagChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setTagInput(e.target.value);
  };

  const handleAddTag = () => {
    if (tagInput && !taskData.tags.includes(tagInput)) {
      setTaskData((prevData) => ({
        ...prevData,
        tags: [...prevData.tags, tagInput],
      }));
      setTagInput('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTaskData((prevData) => ({
      ...prevData,
      tags: prevData.tags.filter((tag) => tag !== tagToRemove),
    }));
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ): void => {
    const { name, value } = e.target;
    setTaskData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    if (taskData.id) {
      taskData.dueDate = new Date(taskData.dueDate).getTime().toString();
      dispatch(editTask(JSON.stringify(taskData)));
      axios
        .put(
          `https://jsonplaceholder.typicode.com/todos/${taskData.id}`,
          taskData,
        )
        .then(() => {
          dispatch(setSuccess('Task updated successfully'));
          const localTasks: Task[] = JSON.parse(
            localStorage.getItem('tasks') as string,
          );
          const updatedTasks = localTasks.map((task: Task) => {
            if (task.id === taskData.id) {
              return taskData;
            }
            return task;
          });
          localStorage.setItem('tasks', JSON.stringify(updatedTasks));
        })
        .catch((error) => {
          dispatch(setError(error.message));
        });
    } else {
      const newTask: Task = new Task({ ...taskData });
      dispatch(addTask(JSON.stringify(newTask)));
      axios
        .post('https://jsonplaceholder.typicode.com/todos', newTask)
        .then(() => {
          dispatch(setSuccess('Task created successfully'));
          const localTasks: Task[] = JSON.parse(
            localStorage.getItem('tasks') as string,
          );
          localStorage.setItem(
            'tasks',
            JSON.stringify([...localTasks, newTask]),
          );
        })
        .catch((error) => {
          dispatch(setError(error.message));
        });
    }

    toggleTaskForm();
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formTaskTitle">
        <Form.Label>Title</Form.Label>
        <Form.Control
          type="text"
          name="title"
          value={taskData.title}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Form.Group controlId="formTaskDescription">
        <Form.Label>Description</Form.Label>
        <Form.Control
          as="textarea"
          name="description"
          value={taskData.description}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group controlId="formTaskDueDate">
        <Form.Label>Due Date</Form.Label>
        <Form.Control
          type="date"
          name="dueDate"
          value={taskData.dueDate}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group controlId="formTaskPriority">
        <Form.Label>Priority</Form.Label>
        <Form.Control
          as="select"
          name="priority"
          value={taskData.priority}
          onChange={handleChange}
        >
          <option value="high">High</option>
          <option value="normal">Normal</option>
          <option value="low">Low</option>
        </Form.Control>
      </Form.Group>

      <Form.Group controlId="formTaskTags">
        <Form.Label>Tags</Form.Label>
        <Row>
          <Col>
            <Form.Control
              type="text"
              value={tagInput}
              onChange={handleTagChange}
              placeholder="Enter a tag and press Add"
            />
          </Col>
          <Col xs="auto">
            <Button
              variant="primary"
              onClick={handleAddTag}
            >
              Add Tag
            </Button>
          </Col>
        </Row>
        <div className="mt-2">
          {taskData.tags.map((tag, index) => (
            <Button
              key={index}
              variant="secondary"
              className="m-2"
              onClick={() => handleRemoveTag(tag)}
            >
              {tag}
            </Button>
          ))}
        </div>
      </Form.Group>

      <Container className="mt-4">
        <Row className="flex-column g-2 justify-content-end align-items-center">
          <Button
            variant="success"
            type="submit"
          >
            {taskData.id ? 'Update Task' : 'Create Task'}
          </Button>
          <Button
            variant="danger"
            className="ml-2"
            onClick={toggleTaskForm}
          >
            Cancel
          </Button>
        </Row>
      </Container>
    </Form>
  );
};

export default TaskForm;
