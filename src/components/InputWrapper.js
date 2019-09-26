import React from 'react';
import './Input.scss';

function InputWrapper(props) {
    return (
        <div className={'input-group' + (props.className ? 
            ` ${props.className}` : '')}>
            <span className="input-group__title">{props.title}</span>
            <div className="input-group__group">
                {props.children}
            </div>
        </div>
    );
}

export default InputWrapper;