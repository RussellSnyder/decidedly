import React from 'react';
import {
  Jumbotron,
  Container,
  Button
} from 'reactstrap';

import { NavLink } from 'react-router-dom'
import { useDispatch } from 'react-redux';

import {
  setLoginFormOpen,
} from '../components/UI/UISlice'

export default () => {
  const dispatch = useDispatch();
  
  return (
    <main role="main">
      <Jumbotron className="text-center">
        <Container>
          <h1 className="display-3">It's Your Choice</h1>
          <p>Make the best decision for tomorrow based on what is important to you today!</p>
          {/* <Button
            color="primary"
            size="lg"
            onClick={() => dispatch(setLoginFormOpen({open: true}))}
          >
            Let's Get Started
          </Button> */}
          <NavLink
            className="btn btn-lg btn-primary"
            to={"/collections"}
          >
            Let's Get Started
          </NavLink>
        </Container>
      </Jumbotron>
    </main>
  )
}