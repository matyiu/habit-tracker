import React from 'react';
import './Habit.scss';
import { slideToggle } from '../utils/animationEffects';
import { DateUtils } from 'react-day-picker';

function getDay(day, startDay) {
    const daysOfTheWeek = {
        sunday: 0,
        monday: 1,
        tuesday: 2,
        wednesday: 3,
        thursday: 4,
        friday: 5,
        saturday: 6
    }

    return (day + 7 - daysOfTheWeek[startDay]) % 7;
}

class Habit extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            open: false,
        }

        this.habitToggle = this.habitToggle.bind(this);
    }

    habitToggle() {
        slideToggle(this.habitBody, 300);
        this.setState({ open: !this.state.open });
    }

    renderCalendar() {
        const { duration, startDate } = this.props.habitOptions;
        this.startDate = startDate;
        const currDay = new Date(startDate.getTime());

        let totalWeeks = (duration.type === 'week') ? Number(duration.value) :
            Math.ceil(duration.value / 7);
        const totalDays = (duration.type === 'day') ? Number(duration.value) :
            duration.value * 7;

        this.endDate = new Date(startDate.getTime());
        this.endDate.setDate(Number(duration.type === 'day' 
            ? duration.value : totalWeeks * 7) + currDay.getDate() - 1);

        if ((getDay(currDay.getDay(), 'monday') > 0) && (totalDays % 7) === 0) {
            totalWeeks += 1;
        }
        
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const weeks = [];
        for (let y = 0; y < totalWeeks; y++) {
            const days = [];
            for (let x = 0; x < 7; x++) {
                let todayStyle;

                let day;
                if ((y == 0 && (getDay(currDay.getDay(), 'monday') > x)) ||
                    DateUtils.isDayAfter(currDay, this.endDate)) {
                    day = '';
                } else {
                    todayStyle = DateUtils.isSameDay(today, currDay) ? {
                        boxShadow: '0 -6px 0 #0E9F85 inset'
                    } : {};
                    day = currDay.getDate();
                    currDay.setDate(currDay.getDate() + 1);
                }

                days.push(
                    <td className="calendar__cell calendar__cell--day" style={todayStyle} key={x + y * 7}>{ day }</td>
                );

            }
            weeks.push(
                <tr className="calendar__row" key={y}>
                    { days }
                </tr>
            );
        }

        return weeks;
    }

    render() {
        const weeks = this.renderCalendar();
        const today = DateUtils.isDayInRange(new Date(), {
            from: this.startDate,
            to: this.endDate
        });

        return (
            <div className="habit habit--full" 
            data-state={this.state.open ? 'open' : 'closed'}>
                <header className="habit__header" onClick={this.habitToggle}>
                    <span className="habit__title">
                        <i className="habit__header__icon fas fa-angle-down"></i>
                        { this.props.habitOptions.name }
                    </span>
                    <div className="habit__header__action">
                        { 
                            !today || 
                            <button className="btn btn--habit habit__btn-day">{ (new Date()).getDate() }</button> 
                        }
                        <button className="btn btn--habit habit__btn-options">
                            <i className="fas fa-ellipsis-v"></i>
                        </button>
                    </div>
                </header>
                <div className="habit__body"
                ref={(habitBody) => { this.habitBody = habitBody; }}>
                    <table className="calendar">
                        <thead className="calendar__header">
                            <tr className="calendar__row calendar__row--header">
                                <th className="calendar__cell calendar__cell--header">Mon</th>
                                <th className="calendar__cell calendar__cell--header">Tue</th>
                                <th className="calendar__cell calendar__cell--header">Wed</th>
                                <th className="calendar__cell calendar__cell--header">Thu</th>
                                <th className="calendar__cell calendar__cell--header">Fri</th>
                                <th className="calendar__cell calendar__cell--header">Sat</th>
                                <th className="calendar__cell calendar__cell--header">Sun</th>
                            </tr>
                        </thead>
                        <tbody className="calendar__body">
                            { weeks }
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

export default Habit;