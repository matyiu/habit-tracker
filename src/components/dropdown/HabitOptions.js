import React from 'react';
import { Dropdown, DropdownItem } from "./Dropdown";

export default function HabitOptions({ id, ...props }) {
    return (
        <Dropdown {...props}>
            <DropdownItem text='Edit' />
            <DropdownItem text='Delete' />
        </Dropdown>
    );
}