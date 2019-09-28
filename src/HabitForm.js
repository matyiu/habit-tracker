import React from 'react';
import './HabitForm.scss';
import InputWrapper from './components/InputWrapper';
import Select from './components/Select';
import { LocaleUtils } from 'react-day-picker';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';

function formatDate(date, format, locale) {
    const month = LocaleUtils.formatMonthTitle(date, locale);

    return `${date.getDate()} ${month}`;
}

class HabitForm extends React.Component {
    render() {
        return (
            <header className="habit-form" data-state="open">
                <div className="habit-form__content">
                    <input type="text" 
                    placeholder="Add a habit" 
                    className="habit-form__title" />
                    <InputWrapper title="Select type of habit" 
                    className="habit-form__type">
                        <Select width="275px" className="input-group__input">
                            <option value="daily">Daily</option>
                            <option value="specific">Specific days of the week</option>
                            <option value="number">Number of days per week</option>
                        </Select>
                    </InputWrapper>
                    <div className="habit-form__date">
                        <InputWrapper title="Start Date">
                            <div className="habit-form__date__container">
                                <DayPickerInput 
                                className="input-group__input"
                                dayPickerProps={{locale: 'en'}}
                                formatDate={formatDate}
                                placeholder=""
                                inputProps={{ readOnly: true }} />
                                <i class="input-group__icon fas fa-calendar"></i>
                            </div>
                        </InputWrapper>
                        <InputWrapper title="Duration">
                            <Select width="110px" className="input-group__input">
                                <option value="day">Days</option>
                                <option value="week">Weeks</option>
                            </Select>
                            <input type="text" style={{width: '50px'}} 
                            className="number" pattern="[0-9]*"
                            inputMode="numeric" />
                        </InputWrapper>
                    </div>
                    <button className="btn btn--white">Create Habit</button>
                </div>
                <div className="overlay"></div>
            </header>
        );
    }
}

export default HabitForm;