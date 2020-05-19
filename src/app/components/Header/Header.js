import React, { useState } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem,
  NavbarText,
  Container
} from 'reactstrap';

import { FaGithub } from 'react-icons/fa';

import { NavLink as Link } from 'react-router-dom'
import { useEffect } from 'react';

let lastLocation;

const Header = ({history}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  useEffect(() => {
    if (lastLocation !== history.location) {
      setIsOpen(false)
    }

    lastLocation = history.location;
  }, [history.location])

  return (
    <header>
      <Link
        to="/"
        className="d-none d-md-block nav-link"
      >
        <h1 className="text-center">Decidedly</h1>
      </Link>
      <Navbar color="light" light expand="md">
        <Container>
          <Link to="/" className="d-md-none navbar-brand">
            Decidedly
          </Link>
          <NavbarToggler onClick={toggle} />
          <Collapse isOpen={isOpen} navbar>
            <Nav className="mr-auto" navbar>
              <NavItem>
                <Link
                  to="/collections"
                  activeClassName='active'
                  className="nav-link"
                >
                  My Decisions
                </Link>
              </NavItem>
              <NavItem>
                <Link
                  to="/templates"
                  activeClassName='active'
                  className="nav-link"
                >
                  Templates
                </Link>
              </NavItem>
            </Nav>
            <NavbarText>
              <a href="https://github.com/RussellSnyder/decidedly"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaGithub size="24" className="mr-2" />
                Beta v0.0.3
              </a>
            </NavbarText>
          </Collapse>
        </Container>
      </Navbar>
    </header>
  );
}

export default Header;