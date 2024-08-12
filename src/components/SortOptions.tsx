import React, { memo } from 'react';
import { Dropdown, ButtonGroup, ButtonToolbar } from 'react-bootstrap';
import useReduxState from '../store/hooks/useReduxState';
import { setSort } from '../store/slices/globals';
import { sortTasks } from '../store/slices/taskManagement';

const SortOptions: React.FC = () => {
  const [sort, dispatchSort] = useReduxState((state) => state.globals.sort);

  return (
    <ButtonToolbar>
      <ButtonGroup className="mx-1">
        <Dropdown>
          <Dropdown.Toggle variant="secondary">Sort By</Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item
              active={sort.by === 'noSort'}
              onClick={(e) => {
                e.preventDefault();
                dispatchSort(
                  setSort({
                    by: 'noSort',
                  }),
                );
              }}
            >
              No Sort
            </Dropdown.Item>
            <Dropdown.Item
              active={sort.by === 'dueDate'}
              onClick={(e) => {
                e.preventDefault();
                dispatchSort(
                  setSort({
                    by: 'dueDate',
                  }),
                );
                dispatchSort(
                  sortTasks({
                    by: 'dueDate',
                    direction: sort.direction,
                  }),
                );
              }}
            >
              Due Date
            </Dropdown.Item>
            <Dropdown.Item
              active={sort.by === 'creationDate'}
              onClick={(e) => {
                e.preventDefault();
                dispatchSort(
                  setSort({
                    by: 'creationDate',
                  }),
                );
                dispatchSort(
                  sortTasks({
                    by: 'creationDate',
                    direction: sort.direction,
                  }),
                );
              }}
            >
              Creation Date
            </Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item
              active={sort.direction === 'asc'}
              onClick={(e) => {
                e.preventDefault();
                dispatchSort(
                  setSort({
                    direction: 'asc',
                  }),
                );
                dispatchSort(
                  sortTasks({
                    by: sort.by,
                    direction: 'asc',
                  }),
                );
              }}
            >
              ASC
            </Dropdown.Item>
            <Dropdown.Item
              active={sort.direction === 'desc'}
              onClick={(e) => {
                e.preventDefault();

                dispatchSort(
                  setSort({
                    direction: 'desc',
                  }),
                );
                dispatchSort(
                  sortTasks({
                    by: sort.by,
                    direction: 'desc',
                  }),
                );
              }}
            >
              DESC
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </ButtonGroup>
    </ButtonToolbar>
  );
};

export default memo(SortOptions);
