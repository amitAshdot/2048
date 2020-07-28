import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { startOver } from '../../store/board/actions';
import PrimaryBtn from '../buttons/PrimaryBtn';

const EndScreen = () => {

    const board = useSelector(state => state.boardReducer);
    const dispatch = useDispatch();

    const handleClick = () => {
        dispatch(startOver())
    }
    return (
        <div className="end-screen">
            <h2 className="end-screen__title"> GAME OVER! </h2>
            <p className="end-screen__p">Would you like to try again?</p>
            <PrimaryBtn handleClick={handleClick} text={`Start Over`} />
        </div>
    )
}

export default EndScreen
