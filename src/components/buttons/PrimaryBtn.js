import React from 'react'

const PrimaryBtn = (props) => {
    return (
        <button className="primary-Btn" onClick={props.handleClick}>
            {props.text}
        </button>
    )
}

export default PrimaryBtn
