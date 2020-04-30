import React from 'react';
import './App.css';
import UserWeights from './app/components/UserWeights/UserWeights'
import DecisionCollection from './app/components/DecisionCollection/DecisionCollection'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { NavLink } from 'react-router-dom'

function App() {
  return (
    <div className="App">
      <div className="container py-4">
        <Router>
          <NavLink to="/">
            <h1 className="text-center">Decidedly</h1>
          </NavLink>
          <NavLink exact to="weights/">Weights</NavLink>
          <br/>
          <NavLink exact to="collections/">DecisionCollection</NavLink>
          <Route path="/collections" component={DecisionCollection} />
          <Route path="/weights" component={UserWeights} />
        </Router>         
      </div>  
    </div>
  );
}

export default App;
