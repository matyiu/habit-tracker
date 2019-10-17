import React from 'react';
import { Dropdown, DropdownItem } from "./Dropdown";

export default function HabitOptions({ id, storage, update, ...props }) {
    return (
        <Dropdown {...props}>
            <DropdownItem text='Edit' />
            <DropdownItem text='Delete' 
            onClick={() => {
                storage.remove(id);
                update();
            }} />
        </Dropdown>
    );
}