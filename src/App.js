import React from 'react';
import './App.css';
import UserWeights from './app/components/UserWeights/UserWeights'

function App() {
  return (
    <div className="App">
      <div className="container py-4">
        <h1 className="text-center">Decidedly</h1>
        <UserWeights /> 
      </div>  
    </div>
  );
}

export default App;
