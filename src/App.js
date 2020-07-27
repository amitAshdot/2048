import React from 'react';
import './App.css';
import Board from './components/Board';
import Settings from './components/Settings';

function App() {
  return (
    <div className="App">
      <Settings />
      <Board />
    </div>
  );
}

export default App;
