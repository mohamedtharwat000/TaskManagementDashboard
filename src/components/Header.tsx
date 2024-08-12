import React, { memo } from 'react';
import { Navbar, Container, Nav, Button } from 'react-bootstrap';
import useReduxState from '../store/hooks/useReduxState';
import { toggleTheme } from '../store/slices/globals';

const Header: React.FC = () => {
  const [theme, dispatchTheme] = useReduxState((state) => state.globals.theme);

  return (
    <Navbar className="shadow-lg">
      <Container className="d-flex flex-wrap justify-content-center justify-content-sm-between align-items-center">
        <Navbar.Brand href="#">Task Management Dashboard</Navbar.Brand>
        <Nav className="ml-auto">
          <Button
            className="border"
            variant={theme === 'light' ? 'dark' : 'light'}
            onClick={() => {
              dispatchTheme(toggleTheme());
            }}
          >
            {theme + ' mode'}
          </Button>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default memo(Header);
