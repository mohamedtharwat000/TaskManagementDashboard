import React, { memo, useMemo, useCallback, useState } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { Card, Button, Form, Container, Modal } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { deleteTask, toggleTask } from '../store/slices/taskManagement';
import Task from '../types/Task';
import TaskForm from './TaskForm';
import TaskDetailsModal from './TaskDetailsModal';
import axios from 'axios';
import { setError, setSuccess } from '../store/slices/globals';

const TaskItem: React.FC<{
  taskData: Task;
  index: number;
  moveTask: (dragIndex: number, hoverIndex: number) => void;
}> = ({ taskData, index, moveTask }) => {
  const dispatch = useDispatch();

  const ref = React.useRef<HTMLDivElement>(null);

  const [, drag] = useDrag({
    type: 'TASK',
    collect: (monitor) => monitor,
    item: () => ({ index }),
  });

  const [monitor, drop] = useDrop<{ index: number }>({
    accept: 'TASK',
    collect: (monitor) => monitor,
    hover(item: { index: number }, monitor) {
      const dragIndex = item.index;
      const hoverIndex = index;

      if (ref.current) {
        if (dragIndex !== hoverIndex) {
          const hoverBoundingRect = ref.current.getBoundingClientRect();
          const hoverMiddleY =
            (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
          const clientOffset = monitor.getClientOffset();
          const hoverClientY = clientOffset!.y - hoverBoundingRect.top;

          if (
            (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) ||
            (dragIndex > hoverIndex && hoverClientY > hoverMiddleY)
          ) {
            moveTask(dragIndex, hoverIndex);
            item.index = hoverIndex;
          }
        }
      }

      moveTask(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  drag(drop(ref));

  const [taskFormShow, setTaskFormShow] = useState(false);
  const toggleTaskForm = () => setTaskFormShow(!taskFormShow);

  const [taskDetailsShow, setTaskDetailsShow] = useState(false);
  const toggleTaskDetails = () => setTaskDetailsShow(!taskDetailsShow);

  const dueDateString = useMemo(
    () =>
      taskData.dueDate
        ? new Date(Number(taskData.dueDate)).toLocaleDateString()
        : 'No Due Date',
    [taskData.dueDate],
  );

  const handleDeleteTask = useCallback(() => {
    dispatch(deleteTask(JSON.stringify(taskData)));
    dispatch(setSuccess('Task deleted successfully'));
    axios
      .delete(`https://jsonplaceholder.typicode.com/todos/${taskData.id}`)
      .then(() => {
        dispatch(setSuccess('Sync successful'));
      })
      .catch((err) => {
        dispatch(setError(err.message));
      });
  }, [dispatch, taskData]);

  return (
    <>
      <Card
        ref={ref}
        style={{ width: '350px' }}
        data-handler-id={monitor.handlerId}
        className="shadow-lg rounded-4 flex-shrink-0 btn"
        onClick={toggleTaskDetails}
      >
        <Card.Body>
          <Card.Title
            className="fs-4 text-nowrap overflow-hidden text-truncate"
            title={taskData.title}
          >
            {taskData.title}
          </Card.Title>
          <Card.Text>Due Date: {dueDateString}</Card.Text>
          <Container className="d-flex justify-content-between align-items-center">
            <Container
              className="d-flex flex-column justify-content-center align-items-center p-0"
              style={{ width: '50%' }}
            >
              <Form.Check
                type="switch"
                id={'completed'}
                checked={taskData.completed}
                onClick={(event) => event.stopPropagation()}
                onChange={() => dispatch(toggleTask(JSON.stringify(taskData)))}
              />
              <Form.Label htmlFor={'completed'}>Completed</Form.Label>
            </Container>

            <Container className="d-flex justify-content-evenly align-items-center p-0">
              <Button
                variant="outline-danger"
                onClick={(event) => {
                  event.stopPropagation();
                  handleDeleteTask();
                }}
              >
                Delete
              </Button>
              <Button
                variant="outline-primary"
                onClick={(event) => {
                  event.stopPropagation();
                  toggleTaskForm();
                }}
              >
                Edit
              </Button>
            </Container>
          </Container>
        </Card.Body>
      </Card>
      <Modal
        show={taskFormShow}
        onHide={toggleTaskForm}
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <TaskForm
            task={taskData}
            formType="edit"
            toggleTaskForm={toggleTaskForm}
          />
        </Modal.Body>
      </Modal>
      <TaskDetailsModal
        taskData={taskData}
        show={taskDetailsShow}
        onHide={toggleTaskDetails}
      />
    </>
  );
};

export default memo(TaskItem);
