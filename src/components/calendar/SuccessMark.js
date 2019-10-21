import React from "react";
import { getDay } from "./CalendarUtils";

export default function SuccessMark(props) {
    const { dates, before, after } = props.completedGroup;
    const rowWidth = props.parent.current.offsetWidth;
    const cellWidth = rowWidth / 7,
          start = getDay(dates[0].getDay(), 'monday'),
          coords = {
            x: start * cellWidth,
            y: 0
          };
    const MIDDLE_POINT_WIDTH = (19 * rowWidth) / 642;
    let width = (dates.length * cellWidth) - (MIDDLE_POINT_WIDTH * 2);
    let left = coords.x + MIDDLE_POINT_WIDTH;
    if (before) {
      width += cellWidth;
      left -= cellWidth;
    } if (after) {
      width += cellWidth;
    }
    const style = {
        left,
        width
    }

    return (
        <td style={style} className="success-day success-day--calendar"></td>
    );
}