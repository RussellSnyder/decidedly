import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import axios from "axios";

import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem,
  NavLink,
  NavbarText,
  Container
} from 'reactstrap';

import {
  setLoginFormOpen,
} from '../UI/UISlice'

import {
  selectCurrentUser,
  logOutUser,
} from '../CurrentUser/CurrentUserSlice'

import { NavLink as Link } from 'react-router-dom'
import { useEffect } from 'react';

const showLogoutSuccessMessage = () => (
  toast.info('Logout Successful', {
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
  })
)


let lastLocation;

const Header = ({history}) => {
  const dispatch = useDispatch();
  const currentUser = useSelector(selectCurrentUser);

  const { isSignedIn } = currentUser;
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
            {isSignedIn && <NavItem>
                <Link
                  to="/collections"
                  activeClassName='active'
                  className="nav-link"
                >
                  My Decisions
                </Link>
              </NavItem>}
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
            <Nav className="ml-auto" navbar>
              <NavItem>
                {!isSignedIn && <NavLink
                  onClick={() => {
                    dispatch(setLoginFormOpen({open: true}))
                  }}
                >
                  Login
                </NavLink>}
                {isSignedIn && <NavLink
                  onClick={() => {
                    axios.get("/logout")
                    .then(res => {
                      dispatch(logOutUser())
                      showLogoutSuccessMessage()
                    })
                    .catch(err => {
                        console.log(err);
                        console.log(err.response);
                    });              
                  }}
                >
                  Logout
                </NavLink>}
              </NavItem>
            </Nav>
          </Collapse>
        </Container>
      </Navbar>
    </header>
  );
}

export default Header;