import React from 'react';
import './App.css';
import SetupBoard from './components/gameboard/SetupBoard.js';
import {Provider} from 'react-redux'
import store from './store.js'

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <header className="App-header">
          <SetupBoard />
        </header>
      </div>
    </Provider>
  )
}

export default App;
