import React from "react";
import { Dropdown, DropdownItem } from "./Dropdown";

export default function HabitDayMenu({ setRef, ...props }) {
    return (
        <Dropdown setRef={setRef} {...props}>
            <DropdownItem text="Success" />
            <DropdownItem text="Failure" />
        </Dropdown>
    );
}