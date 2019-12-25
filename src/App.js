import React from 'react';
import './App.css';
import Board from './components/gameboard/Board.js';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Board type={Board.types.enemy}/>
        <Board type={Board.types.player}/>
      </header>
    </div>
  );
}

export default App;
