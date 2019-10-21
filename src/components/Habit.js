import React from 'react';
import './Habit.scss';
import { slideToggle } from '../utils/animationEffects';
import { DateUtils } from 'react-day-picker';
import { getDay, getWeekCompletedGroups, findDay } from "./calendar/CalendarUtils";
import SuccessMark from './calendar/SuccessMark';

class Habit extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            open: false,
            windowSize: {
                width: null,
                height: null
            }
        }

        this.habitToggle = this.habitToggle.bind(this);
        this.setActiveHabit = this.setActiveHabit.bind(this);
        this.resizeHandler = this.resizeHandler.bind(this);
        
        this.today = new Date();
        this.today.setHours(0, 0, 0, 0);

        this.calendarBody = React.createRef();
    }

    habitToggle() {
        slideToggle(this.habitBody, 300);
        this.setState({ open: !this.state.open });
    }

    setActiveHabit(e, day) {
        this.props.displayDayMenu(e);
        this.props.setId(this.props.habitOptions.id);
        this.props.setDay(day);
    }

    renderCalendar() {
        const { duration, startDate, dayStates } = this.props.habitOptions;
        this.startDate = startDate;
        const currDay = new Date(startDate.getTime());
        currDay.setHours(0, 0, 0, 0);

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
            const weekDates = [];
            for (let x = 0; x < 7; x++) {
                let todayStyle;

                let day, dayToSave, currDayState;
                if ((y == 0 && (getDay(currDay.getDay(), 'monday') > x)) ||
                    DateUtils.isDayAfter(currDay, this.endDate)) {
                    day = '';
                } else {
                    todayStyle = DateUtils.isSameDay(today, currDay) ? {
                        boxShadow: '0 -6px 0 #0E9F85 inset'
                    } : {};
                    day = currDay.getDate();
                    dayToSave = new Date(currDay.getTime());
                    currDay.setDate(currDay.getDate() + 1);
                    weekDates.push(dayToSave);
                    currDayState = dayStates.find((dayState) => findDay(dayState, dayToSave));
                }

                days.push(
                    <td className="calendar__cell calendar__cell--day" style={todayStyle} key={x + y * 7}
                    onClick={ day ? (e) => {
                        this.setActiveHabit(e, dayToSave);
                    } : null }>
                        { (currDayState && currDayState.state === 'missed') &&
                        <i className="failure-day failure-day--calendar fas fa-times"></i> }
                        { day }
                    </td>
                );

            }
            const weekCompletedGroups = getWeekCompletedGroups(weekDates, dayStates, {
                startDate: this.startDate,
                endDate: this.endDate
            });
            
            weeks.push(
                <tr className="calendar__row" key={y}>
                    {this.calendarBody.current && 
                        weekCompletedGroups.map(group => <SuccessMark key={group.dates[0]} completedGroup={group} parent={this.calendarBody} />)}
                    { days }
                </tr>
            );
        }

        return weeks;
    }

    resizeHandler() {
        this.setState({
            windowSize: {
                width: window.innerWidth,
                height: window.innerHeight
            }
        });
    }

    componentDidMount() {
        window.addEventListener('resize', this.resizeHandler);
    }

    componentWillUnmount() {
        window.addEventListener('resize', this.resizeHandler);
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
                            <button className="btn btn--habit habit__btn-day"
                            onClick={e => this.setActiveHabit(e, this.today) }>
                                { (new Date()).getDate() }
                            </button> 
                        }
                        <button className="btn btn--habit habit__btn-options"
                        onClick={(e) => {
                            this.props.displayHabitOptions(e);
                            this.props.setId(this.props.habitOptions.id);
                        }}>
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
                        <tbody className="calendar__body" ref={this.calendarBody}>
                            { weeks }
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

export default Habit;