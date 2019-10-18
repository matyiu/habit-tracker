import React from 'react';
import { Dropdown, DropdownItem } from "./Dropdown";

export default function HabitOptions({ id, storage, update, toggleEditor, ...props }) {
    return (
        <Dropdown {...props}>
            <DropdownItem text='Edit' onClick={() => {
                toggleEditor();
            }} />
            <DropdownItem text='Delete' 
            onClick={() => {
                storage.remove(id);
                update();
            }} />
        </Dropdown>
    );
}