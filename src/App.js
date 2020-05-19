import React from 'react';
import './App.css';
import UserWeights from './app/components/UserWeights/UserWeights'
import OptionCollection from './app/components/OptionCollection/OptionCollection'
import DecisionCollections from './app/components/DecisionCollections/DecisionCollections'
import DecisionCollection from './app/components/DecisionCollection/DecisionCollection'
import DecisionTemplates from './app/components/DecisionTemplates/DecisionTemplates'
import DecisionTemplate from './app/components/DecisionTemplate/DecisionTemplate'


import Home from './app/pages/Home'



import Option from './app/components/Option/Option'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Header from './app/components/Header/Header'
import Footer from './app/components/Footer/Footer'

function App() {
  return (
    <div className="App">
      <div className="py-4">
        <Router>
          <Route component={Header} />
          <hr/>
          <Route exact path="/" component={Home} />
          <Route exact path="/collections" component={DecisionCollections} />
          <Route path="/collections/:decisionCollectionId" component={DecisionCollection} />
          <Route path="/collections/:decisionCollectionId/weights" component={UserWeights} />
          <Route path="/collections/:decisionCollectionId/options" exact component={OptionCollection} />
          <Route path="/collections/:decisionCollectionId/options/:optionId" component={Option} />
          <Route exact path="/templates" component={DecisionTemplates} />
          <Route exact path="/templates/:decisionTemplateId" component={DecisionTemplate} />
        </Router>
        <Footer />
      </div>  
    </div>
  );
}

export default App;
