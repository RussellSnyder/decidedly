import React from 'react';
import './App.css';
import UserWeights from './app/components/UserWeights/UserWeights'
import OptionCollection from './app/components/OptionCollection/OptionCollection'
import DecisionCollections from './app/components/DecisionCollections/DecisionCollections'
import DecisionCollection from './app/components/DecisionCollection/DecisionCollection'


import Home from './app/pages/Home'



import Option from './app/components/Option/Option'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Header from './app/components/Header/Header'
import Footer from './app/components/Footer/Footer'

function App() {
  return (
    <div className="App">
      <div className="py-4">
        <Header />
        <Router>
          <hr/>
          <Route exact path="/" component={Home} />
          <Route exact path="/collections" component={DecisionCollections} />
          <Route path="/collections/:decisionCollectionId" component={DecisionCollection} />
          <Route path="/collections/:decisionCollectionId/weights" component={UserWeights} />
          <Route path="/collections/:decisionCollectionId/options" exact component={OptionCollection} />
          <Route path="/collections/:decisionCollectionId/options/:optionId" component={Option} />
        </Router>
        <Footer />
      </div>  
    </div>
  );
}

export default App;
