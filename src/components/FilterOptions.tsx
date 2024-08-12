import React, { memo } from 'react';
import { Dropdown, ButtonGroup, ButtonToolbar } from 'react-bootstrap';
import useReduxState from '../store/hooks/useReduxState';
import { setFilter } from '../store/slices/globals';
import { filterTasks } from '../store/slices/taskManagement';

const FilterOptions: React.FC = () => {
  const [filter, dispatchFilter] = useReduxState(
    (state) => state.globals.filter,
  );

  return (
    <ButtonToolbar className="d-flex justify-content-center align-items-center flex-nowrap">
      <ButtonGroup>
        <Dropdown>
          <Dropdown.Toggle variant="secondary">Status</Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item
              active={filter.status === 'all'}
              onClick={(e) => {
                e.preventDefault();
                dispatchFilter(setFilter({ status: 'all' }));
                dispatchFilter(
                  filterTasks({
                    status: 'all',
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
                dispatchFilter(setFilter({ status: 'completed' }));
                dispatchFilter(
                  filterTasks({
                    status: 'completed',
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
                dispatchFilter(setFilter({ status: 'incomplete' }));
                dispatchFilter(
                  filterTasks({
                    status: 'incomplete',
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
              active={filter.priority === 'all'}
              onClick={(e) => {
                e.preventDefault();
                dispatchFilter(setFilter({ priority: 'all' }));
                dispatchFilter(
                  filterTasks({
                    priority: 'all',
                  }),
                );
              }}
            >
              All
            </Dropdown.Item>
            <Dropdown.Item
              active={filter.priority === 'high'}
              onClick={(e) => {
                e.preventDefault();
                dispatchFilter(setFilter({ priority: 'high' }));
                dispatchFilter(
                  filterTasks({
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
                dispatchFilter(setFilter({ priority: 'low' }));
                dispatchFilter(
                  filterTasks({
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

export default memo(FilterOptions);
