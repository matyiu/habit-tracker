import React from 'react';
import './HabitForm.scss';
import InputWrapper from './components/InputWrapper';
import Select from './components/Select';

class HabitForm extends React.Component {
    render() {
        return (
            <header className="habit-form" data-state="open">
                <div className="habit-form__content">
                    <input type="text" 
                    placeholder="Add a habit" 
                    className="habit-form__title" />
                    <InputWrapper title="Select type of habit">
                        <Select width="275px">
                            <option value="daily">Daily</option>
                            <option value="specific">Specific days of the week</option>
                            <option value="number">Number of days per week</option>
                        </Select>
                    </InputWrapper>
                </div>
            </header>
        );
    }
}

export default HabitForm;