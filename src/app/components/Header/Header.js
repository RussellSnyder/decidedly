import React, { useState } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  NavbarText,
  Container
} from 'reactstrap';

import { FaGithub } from 'react-icons/fa';

import { NavLink as Link } from 'react-router-dom'
import { BrowserRouter as Router } from 'react-router-dom'

const Header = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Router>
        <Link to="/" className="d-none d-md-block" component={NavLink}>
          <h1 className="text-center">Decidedly</h1>
        </Link>
        <Navbar color="light" light expand="md">
          <Container>
            <NavbarBrand >
              <Link to="/" className="d-md-none" component={NavLink}>
                Decidedly
              </Link>
            </NavbarBrand>
            <NavbarToggler onClick={toggle} />
            <Collapse isOpen={isOpen} navbar>
              <Nav className="mr-auto" navbar>
                <NavItem>
                  <Link to="/collections" activeClassName='active' component={NavLink}>
                    My Decision Collections
                  </Link>
                </NavItem>
              </Nav>
              <NavbarText>
                <a href="https://github.com/RussellSnyder/decidedly"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaGithub size="24" className="mr-2" />
                  Beta v0.0.1
                </a>
              </NavbarText>
            </Collapse>
          </Container>
        </Navbar>
      </Router>
    </div>
  );
}

export default Header;