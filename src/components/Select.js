import React from 'react';
import './Select.scss';

function Select(props) {
    return (
        <div className="select" style={{width: props.width}}>
            <select className={"select__input" 
            + (props.className ? ' ' + props.className : '')}
            onChange={props.onChange} value={props.value}>
                {props.children}
            </select>
            <i class="select__icon fas fa-angle-down"></i>
        </div>
    );
}

export default Select;