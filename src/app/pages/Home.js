import React from 'react';
import {
  Jumbotron,
  Container,
} from 'reactstrap';

import { NavLink } from 'react-router-dom'

export default () => (
  <main role="main">
    <Jumbotron className="text-center">
      <Container>
        <h1 className="display-3">It's Your Choice</h1>
        <p>Making the best decision for tomorrow based on what is important to you today!</p>
        <NavLink className="btn btn-primary btn-lg" role="button" to="/collections">
          Let's Get Started
        </NavLink>
      </Container>
    </Jumbotron>
  </main>
)