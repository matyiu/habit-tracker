import React from 'react';
import './HabitForm.scss';
import InputWrapper from './components/InputWrapper';
import Select from './components/Select';
import { LocaleUtils } from 'react-day-picker';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';
import { slideToggle } from './utils/animationEffects';

function formatDate(date, format, locale) {
    const month = LocaleUtils.formatMonthTitle(date, locale);

    return `${date.getDate()} ${month}`;
}

function parseDate(str, format, locale) {
    const dateExpr = /^(\d{1,2}) ([A-Za-z]+) (\d{4})$/;
    const matchedGroups = str.match(dateExpr);
    const day = Number(matchedGroups[1]),
          month = matchedGroups[2],
          year = Number(matchedGroups[3]);
    const date = new Date();
    date.setHours(0, 0, 0, 0);
    date.setDate(day)
    date.setMonth(LocaleUtils.getMonths(locale).indexOf(month));
    date.setFullYear(year);

    return date;
}

class HabitForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            open: false,
            name: '',
            type: {
                name: 'daily'
            },
            startDate: null,
            duration: {
                type: 'day',
                value: ''
            }
        }

        this.habitList = props.storage;
        this.minHeight = '71px';
        this.overlay = React.createRef();
        this.toggle = this.toggle.bind(this);
        this.submit = this.submit.bind(this);
    }

    toggle(e) {
        if (this.state.open && e.target != this.overlay.current) {
            return;
        }
        
        slideToggle(this.habitFormOptions, 300);
        this.setState({ open: !this.state.open });
    }

    submit() {
        const { name, type, startDate, duration } = this.state;
        const options = { name, type, startDate, duration };
        const { id, setId } = this.props;

        if (id) {
            this.habitList.update(id, options);
            setId(null);
        } else {
            this.habitList.add(options);
        }
        this.overlay.current.click();
        this.clearForm();
        this.props.update();
    }

    clearForm() {
        this.setState({
            name: '',
            type: {
                name: 'daily'
            },
            startDate: '',
            duration: {
                type: 'day',
                value: ''
            }
        });
    }

    populateState() {
        const { id } = this.props;
        const habit = this.habitList.get(id);
        const { name, type, startDate, duration } = habit

        this.setState({
            name,
            type,
            startDate,
            duration
        });
    }

    render() {
        return (
            <header className="habit-form" 
            data-state={this.state.open ? 'open' : 'closed'}>
                <div className="habit-form__content">
                    <input type="text" 
                    placeholder="Add a habit" 
                    className="habit-form__title" onFocus={this.toggle}
                    onChange={(e) => this.setState({ name: e.target.value })} 
                    value={this.state.name} />
                    <div className="habit-form__options"
                    ref={(options) => this.habitFormOptions = options}
                    style={{ display: 'none' }}>
                        <InputWrapper title="Select type of habit" 
                        className="habit-form__type">
                            <Select width="275px" className="input-group__input" 
                            onChange={(e) => { this.setState({ type: { name: e.target.value } }) }}
                            value={this.state.type.name}>
                                <option value="daily">Daily</option>
                                {/* <option value="specific">Specific days of the week</option>
                                <option value="number">Number of days per week</option> */}
                            </Select>
                        </InputWrapper>
                        <div className="habit-form__date">
                            <InputWrapper title="Start Date">
                                <div className="habit-form__date__container">
                                    <DayPickerInput 
                                    className="input-group__input"
                                    dayPickerProps={{locale: 'en'}}
                                    formatDate={formatDate}
                                    parseDate={parseDate}
                                    placeholder=""
                                    inputProps={{ readOnly: true }}
                                    onDayChange={(date) => this.setState({ startDate: date })}
                                    value={this.state.startDate} />
                                    <i className="input-group__icon fas fa-calendar"></i>
                                </div>
                            </InputWrapper>
                            <InputWrapper title="Duration">
                                <Select width="110px" className="input-group__input"
                                onChange={(e) => this.setState({ duration: { ...this.state.duration, type: e.target.value } })}
                                value={this.state.duration.type}>
                                    <option value="day">Days</option>
                                    <option value="week">Weeks</option>
                                </Select>
                                <input type="text" style={{width: '50px'}} 
                                className="number" pattern="[0-9]*"
                                inputMode="numeric"
                                onChange={(e) => this.setState({ duration: { ...this.state.duration, value: e.target.value } })}
                                value={this.state.duration.value} />
                            </InputWrapper>
                        </div>
                        <button className="btn btn--white"
                        onClick={this.submit}>{ this.props.id ?
                        'Modify Habit' : 'Create Habit' }</button>
                    </div>
                </div>
                <div className="overlay" ref={this.overlay}
                onClick={this.toggle}></div>
            </header>
        );
    }
}

export default HabitForm;