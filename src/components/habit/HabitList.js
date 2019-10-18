import React from "react";
import Habit from '../Habit';
import HabitOptions from '../dropdown/HabitOptions';

class HabitList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            dropdown: false,
            activeCoords: {}
        }

        this.dropdownClickOutside = this.dropdownClickOutside.bind(this);
        this.displayHabitOptions = this.displayHabitOptions.bind(this);
    }

    componentDidMount() {
        window.addEventListener('click', this.dropdownClickOutside);
    }

    componentWillUnmount() {
        window.removeEventListener('click', this.dropdownClickOutside)
    }
    
    dropdownClickOutside() {
        if (this.state.dropdown) {
            this.setState({ dropdown: false });
        }
    }

    displayHabitOptions(e) {
        e.stopPropagation();
        this.setState({ dropdown: true });
        const icon = e.currentTarget.querySelector('i');
        const x = icon.getBoundingClientRect().x;
        const y = icon.getBoundingClientRect().y;
        const top = y + icon.offsetHeight + 5;
        const right = window.innerWidth - x - icon.offsetWidth;
        if (top === this.state.activeCoords.top && this.state.dropdown) {
          this.setState({ dropdown: false });
          return;
        }
        this.setState({ activeCoords: { top, right } });
    }

    render() {
        const { storage, update, id, habits, setId, toggleEditor } = this.props;

        return (
            <div className="habit-list">
                <div className="container">
                    <div className="row row--column">
                    { this.state.dropdown &&
                    <HabitOptions 
                    storage={storage}
                    update={update}
                    coords={this.state.activeCoords}
                    id={id}
                    toggleEditor={toggleEditor} /> }
                    {habits.map(habit => 
                    <Habit key={ habit.id } habitOptions={habit}
                    displayHabitOptions={this.displayHabitOptions}
                    setId={setId} />)}
                    </div>
                </div>  
            </div>
        );
    }
}

export default HabitList;