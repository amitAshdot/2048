import React from 'react'

const Output = (props) => {
    return (
        <div className={`settings__outBox ${props.class}`}>
            <h2 className="settings__outBox__title">{props.class}</h2>
            <p>{props.out}</p>
        </div>
    )
}

export default Output
