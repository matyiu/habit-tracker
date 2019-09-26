import React from 'react';
import './Input.scss';

function InputWrapper(props) {
    return (
        <div className="input-group">
            <span className="input-group__title">{props.title}</span>
            <div className="input-group__input">
                {props.children}
            </div>
        </div>
    );
}

export default InputWrapper;