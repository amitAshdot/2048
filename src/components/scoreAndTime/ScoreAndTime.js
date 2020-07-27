import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { time } from '../../store/board/actions';
import Output from './Output';

const Settings = () => {
    const settings = useSelector(state => state.settingsReducer);
    const board = useSelector(state => state.boardReducer);
    const dispatch = useDispatch();

    useEffect(() => {
        let interval = null;
        // if (!settings.pause && !board.pause)
        interval = setInterval(() => {
            dispatch(time());
        }, 1000);
        return () => clearInterval(interval);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return (
        <div className="settings">
            <Output out={board.time} class={'time'} />
            <Output out={board.score} class={'score'} />
        </div>
    )
}

export default Settings
