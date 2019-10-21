import React from "react";
import { Dropdown, DropdownItem } from "./Dropdown";
import { findDay } from "../calendar/CalendarUtils";

function copyDate(day) {
    return {
        date: new Date(day.date.getTime()),
        state: day.state
    };
}

export default function HabitDayMenu({ setRef, id, storage, update, day, ...props }) {
    const habit = storage.get(id);
    
    function setDayState(state) {
        const { id, dayStates, ...options } = habit;
        const newDayState = dayStates.map(copyDate);
        let newDay = newDayState.find(dayState => findDay(dayState, day));
        if (!newDay) {
            newDay = {
                date: day
            };
            newDayState.push(newDay);
        }
        newDay.state = state;
        storage.update(id, { dayStates: newDayState, ...options });
        update();
    }

    return (
        <Dropdown setRef={setRef} {...props}>
            <DropdownItem text="Completed" icon={<div className="habit-day__icon success-day success-day--small"></div>}
            onClick={() => { setDayState('completed'); }} />
            <DropdownItem text="Missed" icon={<i className="habit-day__icon failure-day failure-day--small fas fa-times"></i>}
            onClick={() => { setDayState('missed'); }} />
        </Dropdown>
    );
}