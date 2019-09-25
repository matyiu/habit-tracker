import React from 'react';
import './HabitForm.scss'

class HabitForm extends React.Component {
    render() {
        return (
            <header className="habit-form">
                <input type="text" 
                placeholder="Add a habit" 
                className="habit-form__title" />
            </header>
        );
    }
}

export default HabitForm;