import React, { memo, useMemo } from 'react';
import { Modal, Button, Row, Col, Badge } from 'react-bootstrap';
import Task from '../types/Task';

const TaskDetailsModal: React.FC<{
  show: boolean;
  taskData: Task;
  onHide: () => void;
}> = ({ show, onHide, taskData }) => {
  const creationDateString = useMemo(
    () => new Date(Number(taskData.creationDate)).toDateString(),
    [taskData.creationDate],
  );

  const dueDateString = useMemo(
    () =>
      taskData.dueDate
        ? new Date(Number(taskData.dueDate)).toDateString()
        : 'No Due Date',
    [taskData.dueDate],
  );

  return (
    <Modal
      show={show}
      onHide={onHide}
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>Task Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h5 className="mb-3 text-primary">{taskData.title}</h5>
        <p className="mb-4">
          <strong>Description:</strong>{' '}
          {taskData.description || 'No description provided'}
        </p>
        <Row className="mb-3">
          <Col xs={6}>
            <p>
              <strong>Due Date:</strong> {dueDateString}
            </p>
          </Col>
          <Col xs={6}>
            <p>
              <strong>Created Date:</strong> {creationDateString}
            </p>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col xs={6}>
            <p>
              <strong>Priority:</strong>{' '}
              <Badge
                bg={
                  taskData.priority === 'high'
                    ? 'danger'
                    : taskData.priority === 'low'
                      ? 'warning'
                      : 'success'
                }
              >
                {taskData.priority}
              </Badge>
            </p>
          </Col>
          <Col xs={6}>
            <p>
              <strong>Tags:</strong>{' '}
              {taskData.tags.map((tag) => (
                <Badge
                  bg="secondary"
                  className="me-1"
                  key={tag}
                >
                  {tag}
                </Badge>
              ))}
            </p>
          </Col>
        </Row>
        <p>
          <strong>Status:</strong>{' '}
          <Badge bg={taskData.completed ? 'success' : 'secondary'}>
            {taskData.completed ? 'Completed' : 'Not Completed'}
          </Badge>
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="secondary"
          onClick={onHide}
        >
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default memo(TaskDetailsModal);
