import React from 'react';
import './App.css';
import Board from './components/Board';
import Settings from './components/Settings';
import { useSelector, useDispatch } from 'react-redux';
import { } from './store/board/actions';
import EndScreen from './components/endScreen/EndScreen';

function App() {
  const board = useSelector(state => state.boardReducer);
  const end = (
    board.finish ? <EndScreen /> : null
  )
  return (
    <div className="App">
      <Settings />
      <Board />
      {end}
    </div>
  );
}

export default App;
