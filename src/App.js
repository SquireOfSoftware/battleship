import React from 'react';
import './App.css';
import Board from './components/gameboard/Board.js';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div className='title'>Enemy board</div>
        <Board />
        <div className='title'>Player board</div>
        <Board />
      </header>
    </div>
  );
}

export default App;
