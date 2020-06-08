import React from 'react';
import './App.css';
import WarRoom from './components/gamemaster/WarRoom.js';
import DeploymentRoom from './components/gamemaster/DeploymentRoom.js';

function App() {
  return (
    <div className="App">
      <header className="App-header">
      <DeploymentRoom />
      <WarRoom />
      </header>
    </div>
  )
}

export default App;
