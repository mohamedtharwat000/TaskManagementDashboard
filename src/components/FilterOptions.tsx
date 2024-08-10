import React from 'react';
import { Dropdown, ButtonGroup, ButtonToolbar } from 'react-bootstrap';
import useReduxState from '../store/hooks/useReduxState';
import { setFilter } from '../store/slices/globals';
import { filterTasks } from '../store/slices/taskManagement';

const FilterOptions: React.FC = () => {
  const [filter, dispatch] = useReduxState((state) => state.globals.filter);

  return (
    <ButtonToolbar className="d-flex justify-content-center align-items-center flex-nowrap">
      <ButtonGroup className="mx-1">
        <Dropdown>
          <Dropdown.Toggle variant="secondary">Status</Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item
              active={filter.status === 'all'}
              onClick={(e) => {
                e.preventDefault();
                dispatch(setFilter({ status: 'all' }));
                dispatch(
                  filterTasks({
                    status: 'all',
                    priority: filter.priority,
                  }),
                );
              }}
            >
              All
            </Dropdown.Item>
            <Dropdown.Item
              active={filter.status === 'completed'}
              onClick={(e) => {
                e.preventDefault();
                dispatch(setFilter({ status: 'completed' }));
                dispatch(
                  filterTasks({
                    status: 'completed',
                    priority: filter.priority,
                  }),
                );
              }}
            >
              Completed
            </Dropdown.Item>
            <Dropdown.Item
              active={filter.status === 'incomplete'}
              onClick={(e) => {
                e.preventDefault();
                dispatch(setFilter({ status: 'incomplete' }));
                dispatch(
                  filterTasks({
                    status: 'incomplete',
                    priority: filter.priority,
                  }),
                );
              }}
            >
              Incomplete
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </ButtonGroup>

      <ButtonGroup className="mx-1">
        <Dropdown>
          <Dropdown.Toggle variant="secondary">Priority</Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item
              active={filter.priority === 'normal'}
              onClick={(e) => {
                e.preventDefault();
                dispatch(setFilter({ priority: 'normal' }));
                dispatch(
                  filterTasks({
                    status: filter.status,
                    priority: 'normal',
                  }),
                );
              }}
            >
              Normal
            </Dropdown.Item>
            <Dropdown.Item
              active={filter.priority === 'high'}
              onClick={(e) => {
                e.preventDefault();
                dispatch(setFilter({ priority: 'high' }));
                dispatch(
                  filterTasks({
                    status: filter.status,
                    priority: 'high',
                  }),
                );
              }}
            >
              High
            </Dropdown.Item>
            <Dropdown.Item
              active={filter.priority === 'low'}
              onClick={(e) => {
                e.preventDefault();
                dispatch(setFilter({ priority: 'low' }));
                dispatch(
                  filterTasks({
                    status: filter.status,
                    priority: 'low',
                  }),
                );
              }}
            >
              Low
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </ButtonGroup>
    </ButtonToolbar>
  );
};

export default FilterOptions;
