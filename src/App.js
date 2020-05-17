import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './App.css';
import UserWeights from './app/components/UserWeights/UserWeights'
import OptionCollection from './app/components/OptionCollection/OptionCollection'
import DecisionCollections from './app/components/DecisionCollections/DecisionCollections'
import DecisionCollection from './app/components/DecisionCollection/DecisionCollection'
import Option from './app/components/Option/Option'
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
          <br/>
          <NavLink exact to="/collections">Decision Collections</NavLink>
          <hr/>
          <Route exact path="/collections" component={DecisionCollections} />
          <Route path="/collections/:decisionCollectionId" component={DecisionCollection} />
          <Route path="/collections/:decisionCollectionId/weights" component={UserWeights} />
          <Route path="/collections/:decisionCollectionId/options" exact component={OptionCollection} />
          <Route path="/collections/:decisionCollectionId/options/:optionId" component={Option} />
        </Router>
      </div>  
    </div>
  );
}

export default App;
