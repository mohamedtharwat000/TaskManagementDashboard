import React, { memo, useState, useCallback } from 'react';
import useReduxState from '../store/hooks/useReduxState';
import axios from 'axios';
import { Container, Row, Form, Button, Col } from 'react-bootstrap';
import Task from '../types/Task';
import { addTask, editTask } from '../store/slices/taskManagement';
import { setError, setSuccess } from '../store/slices/globals';

const TaskForm: React.FC<{
  toggleTaskForm: () => void;
  formType: 'new' | 'edit';
  task?: Task;
}> = ({ toggleTaskForm, formType, task }) => {
  const [allTasks, dispatch] = useReduxState(
    (state) => state.taskManagement.allTasks,
  );
  const [taskData, setTaskData] = useState(task ? task : new Task({}));

  const [tagInput, setTagInput] = useState('');

  const handleTagChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>): void => {
      setTagInput(e.target.value);
    },
    [],
  );

  const handleAddTag = useCallback(() => {
    if (tagInput && !taskData.tags.includes(tagInput)) {
      setTaskData((prevData) => ({
        ...prevData,
        tags: [...prevData.tags, tagInput],
      }));
      setTagInput('');
    }
  }, [tagInput, taskData.tags]);

  const handleRemoveTag = useCallback((tagToRemove: string) => {
    setTaskData((prevData) => ({
      ...prevData,
      tags: prevData.tags.filter((tag) => tag !== tagToRemove),
    }));
  }, []);

  const handleChange = useCallback(
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >,
    ): void => {
      const { name, value } = e.target;
      setTaskData((prevData) => ({ ...prevData, [name]: value }));
    },
    [],
  );

  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>): void => {
      e.preventDefault();

      const correctDueDate = new Date(taskData.dueDate).getTime().toString();
      const correctedTaskData = { ...taskData, dueDate: correctDueDate };

      if (formType === 'new') {
        if (
          !allTasks.some((task: Task) => task.title === correctedTaskData.title)
        ) {
          dispatch(addTask(JSON.stringify(correctedTaskData)));
          dispatch(setSuccess('Task created locally successfully'));
          axios
            .post(
              'https://jsonplaceholder.typicode.com/todos',
              correctedTaskData,
            )
            .then(() => {
              dispatch(setSuccess('Sync successful'));
            })
            .catch((error) => {
              dispatch(setError(error.message));
            });
        } else {
          dispatch(setError('Task with the same title already exists'));
        }
      }

      if (formType === 'edit') {
        dispatch(editTask(JSON.stringify(correctedTaskData)));
        dispatch(setSuccess('Task updated successfully'));
        axios
          .put(
            `https://jsonplaceholder.typicode.com/todos/${correctedTaskData.id}`,
            correctedTaskData,
          )
          .then(() => {
            dispatch(setSuccess('Sync successful'));
          })
          .catch((error) => {
            dispatch(setError(error.message));
          });
      }

      toggleTaskForm();
    },
    [formType, toggleTaskForm, allTasks, dispatch, taskData],
  );

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
            {formType === 'edit' ? 'Update Task' : 'Create Task'}
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

export default memo(TaskForm);
