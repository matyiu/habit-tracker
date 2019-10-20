import React from "react";
import { Dropdown, DropdownItem } from "./Dropdown";

export default function HabitDayMenu({ setRef, ...props }) {
    return (
        <Dropdown setRef={setRef} {...props}>
            <DropdownItem text="Success" icon={<div className="habit-day__icon success-day success-day--small"></div>} />
            <DropdownItem text="Failure" icon={<i className="habit-day__icon failure-day failure-day--small fas fa-times"></i>} />
        </Dropdown>
    );
}