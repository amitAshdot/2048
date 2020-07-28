import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { startOver } from '../../store/board/actions';

const EndScreen = () => {

    const board = useSelector(state => state.boardReducer);
    const dispatch = useDispatch();

    const handleClick = () => {
        dispatch(startOver())
    }
    return (
        <div>
            GAME OVER!
            would you like to try again?
            <button onClick={handleClick} >Staer Over</button>
        </div>
    )
}

export default EndScreen
