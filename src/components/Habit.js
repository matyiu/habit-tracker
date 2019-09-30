import React from 'react';
import './Habit.scss';
import { slideToggle } from '../utils/animationEffects';

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

    render() {
        return (
            <div className="habit habit--full" 
            data-state={this.state.open ? 'open' : 'closed'}>
                <header className="habit__header" onClick={this.habitToggle}>
                    <span className="habit__title">
                        <i className="habit__header__icon fas fa-angle-down"></i>
                        Habit #1
                    </span>
                    <div className="habit__header__action">
                        <button className="btn btn--habit habit__btn-day">30</button>
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
                            <tr className="calendar__row">
                                <td className="calendar__cell calendar__cell--day">30</td>
                                <td className="calendar__cell calendar__cell--day">
                                    1
                                    <span className="calendar__new-month">Oct</span>
                                </td>
                                <td className="calendar__cell calendar__cell--day">2</td>
                                <td className="calendar__cell calendar__cell--day">3</td>
                                <td className="calendar__cell calendar__cell--day">4</td>
                                <td className="calendar__cell calendar__cell--day">5</td>
                                <td className="calendar__cell calendar__cell--day">6</td>
                            </tr>
                            <tr className="calendar__row">
                                <td className="calendar__cell calendar__cell--day">7</td>
                                <td className="calendar__cell calendar__cell--day">8</td>
                                <td className="calendar__cell calendar__cell--day">9</td>
                                <td className="calendar__cell calendar__cell--day">10</td>
                                <td className="calendar__cell calendar__cell--day">11</td>
                                <td className="calendar__cell calendar__cell--day">12</td>
                                <td className="calendar__cell calendar__cell--day">13</td>
                            </tr>
                            <tr className="calendar__row">
                                <td className="calendar__cell calendar__cell--day">14</td>
                                <td className="calendar__cell calendar__cell--day">15</td>
                                <td className="calendar__cell calendar__cell--day">16</td>
                                <td className="calendar__cell calendar__cell--day">17</td>
                                <td className="calendar__cell calendar__cell--day">18</td>
                                <td className="calendar__cell calendar__cell--day">19</td>
                                <td className="calendar__cell calendar__cell--day">20</td>
                            </tr>
                            <tr className="calendar__row">
                                <td className="calendar__cell calendar__cell--day">21</td>
                                <td className="calendar__cell calendar__cell--day">22</td>
                                <td className="calendar__cell calendar__cell--day">23</td>
                                <td className="calendar__cell calendar__cell--day">24</td>
                                <td className="calendar__cell calendar__cell--day">25</td>
                                <td className="calendar__cell calendar__cell--day">26</td>
                                <td className="calendar__cell calendar__cell--day">27</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

export default Habit;