import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { time } from '../store/settings/actions';

const Settings = () => {
    const settings = useSelector(state => state.settingsReducer);
    const dispatch = useDispatch();

    // useEffect(() => {
    //     let interval = null;
    //     // if (!settings.pause && !board.pause)
    //     interval = setInterval(() => {
    //         dispatch(time());
    //     }, 1000);
    //     return () => clearInterval(interval);
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [])
    return (
        <div>

        </div>
    )
}

export default Settings
