import React, { memo, useState } from 'react';
import { Container, Row, Col, Button, Modal } from 'react-bootstrap';
import SearchBar from './SearchBar';
import FilterOptions from './FilterOptions';
import SortOptions from './SortOptions';
import TaskForm from './TaskForm';

const MainBar: React.FC = () => {
  const [taskFormShow, setTaskFormShow] = useState(false);

  const toggleTaskForm = () => setTaskFormShow(!taskFormShow);

  return (
    <Container className="my-2">
      <Row className="justify-content-center justify-content-sm-between align-items-center g-4">
        <Col
          className="fs-1 text-center text-lg-start"
          sm={12}
          lg={4}
          xl={2}
        >
          Tasks
        </Col>
        <Col
          sm={12}
          lg={8}
          xl={4}
        >
          <SearchBar />
        </Col>
        <Col
          sm={12}
          lg={12}
          xl={4}
          className="d-flex justify-content-center align-items-center flex-nowrap"
        >
          <SortOptions />
          <FilterOptions />
        </Col>

        <Col
          sm={12}
          lg={12}
          xl={2}
          className="d-flex justify-content-center justify-content-xl-end"
        >
          <Button
            variant="primary"
            onClick={() => {
              toggleTaskForm();
            }}
          >
            Create Task
          </Button>
        </Col>
      </Row>

      <Modal
        show={taskFormShow}
        onHide={() => {
          toggleTaskForm();
        }}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Create Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <TaskForm
            toggleTaskForm={toggleTaskForm}
            formType={'new'}
          />
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default memo(MainBar);
