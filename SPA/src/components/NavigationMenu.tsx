import React from "react";
import { Navbar, Nav, NavDropdown, Container } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";

const NavigationMenu: React.FC = () => {
  const location = useLocation(); // Get current path

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link
              as={Link}
              to="/"
              className={location.pathname === "/" ? "active-link" : ""}
            >
              Home
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/introduction"
              className={
                location.pathname === "/introduction" ? "active-link" : ""
              }
            >
              About us
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/ashramschool"
              className={
                location.pathname === "/ashramschool" ? "active-link" : ""
              }
            >
              Ashram School
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/govhostel"
              className={
                location.pathname === "/govhostel" ? "active-link" : ""
              }
            >
              Gov. Hostel
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/aidedAshram"
              className={
                location.pathname === "/aidedAshram" ? "active-link" : ""
              }
            >
              Aided Ashram School
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/projectOfficerContact"
              className={
                location.pathname === "/projectOfficerContact"
                  ? "active-link"
                  : ""
              }
            >
              Project Officer
            </Nav.Link>
            <NavDropdown title="Innovation Challenge" id="innovation-dropdown">
              <NavDropdown.Item
                as={Link}
                to="/innovation-challenge"
                className={
                  location.pathname === "/innovation-challenge"
                    ? "active-link"
                    : ""
                }
              >
                About the Challenge
              </NavDropdown.Item>
              <NavDropdown.Item
                as={Link}
                to="/innovation-challenge/scope-of-work"
                className={
                  location.pathname === "/innovation-challenge/scope-of-work"
                    ? "active-link"
                    : ""
                }
              >
                Scope of Work
              </NavDropdown.Item>
              <NavDropdown.Item
                as={Link}
                to="/faqs"
                className={location.pathname === "/faqs" ? "active-link" : ""}
              >
                FAQs
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavigationMenu;
