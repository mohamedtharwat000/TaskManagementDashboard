import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-4 shadow-lg m-0">
      <Container>
        <Row className="text-center">
          <Col>
            <p className="mb-0">
              © {currentYear} Mohamed Tharwat. All rights reserved.
            </p>
            <p className="mt-2">
              <a
                className="text-decoration-none"
                href="https://www.github.com//mohamedtharwat000"
              >
                Visit my GitHub
              </a>
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
