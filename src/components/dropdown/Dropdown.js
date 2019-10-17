import React from 'react';
import './dropdown.scss'

export function Dropdown({ coords, className, ...props }) {
    const { top, right, bottom, left } = coords;
    const style = {
        position: 'absolute',
        top,
        right,
        bottom,
        left
    }

    return (
        <div {...props} 
        style={style}
        className={['dropdown', className].join(' ')}>
            { props.children }
        </div>
    );
}

Dropdown.defaultProps = {
    coords: {
        top: null,
        right: null,
        bottom: null,
        left: null,
    }
}

export function DropdownItem({text, className, ...props}) {
    return (
        <button { ...props } className={['btn btn--no-shadow dropdown__item', className].join(' ')}>
            { text }
        </button>
    );
}