import React from "react";
import Habit from '../Habit';
import HabitOptions from '../dropdown/HabitOptions';
import HabitDayMenu from "../dropdown/HabitDayMenu";
import { calcDropdownPosition } from "../dropdown/dropdownUtils";

class HabitList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            dropdown: false,
            dayMenu: false,
            activeCoords: {},
            activeDay: null
        }

        this.dropdownClickOutside = this.dropdownClickOutside.bind(this);
        this.displayHabitOptions = this.displayHabitOptions.bind(this);
        this.setDayMenuRef = this.setDayMenuRef.bind(this);
        this.displayDayMenu = this.displayDayMenu.bind(this);
        this.setDay = this.setDay.bind(this);

        this.dayMenu = React.createRef();
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
        
        if (this.state.dayMenu) {
            this.setState({ dayMenu: false });
        }
    }

    displayHabitOptions(e) {
        e.stopPropagation();
        this.setState({ dropdown: true });
        const icon = e.currentTarget.querySelector('i');
        const x = icon.getBoundingClientRect().left;
        const y = icon.getBoundingClientRect().top;
        const top = y + icon.offsetHeight + 5;
        const right = window.innerWidth - x - icon.offsetWidth;
        if (top === this.state.activeCoords.top && this.state.dropdown) {
          this.setState({ dropdown: false });
          return;
        }
        this.setState({ activeCoords: { top, right } });
    }

    displayDayMenu(e) {
        e.stopPropagation();
        const cell = e.currentTarget;
        const lastDayMenuState = this.state.dayMenu;
        this.setState({ dayMenu: true }, () => {
            const coords = calcDropdownPosition(this.dayMenu, cell);
            if (lastDayMenuState &&
                this.state.activeCoords.top === coords.y && 
                this.state.activeCoords.left === coords.x) {
                this.setState({ dayMenu: false });
            }
            this.setState({ activeCoords: {
                left: coords.x,
                top: coords.y
            } });
        });
    }

    setDayMenuRef(elm) {
        this.dayMenu = elm;
    }

    setDay(day) {
        this.setState({ activeDay: day });
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
                    { this.state.dayMenu &&
                        <HabitDayMenu coords={this.state.activeCoords} 
                        setRef={this.setDayMenuRef} storage={storage} update={update}
                        id={id} day={this.state.activeDay} />
                    }
                    {habits.map(habit => 
                    <Habit key={ habit.id } habitOptions={habit}
                    displayHabitOptions={this.displayHabitOptions}
                    setId={setId}
                    displayDayMenu={this.displayDayMenu}
                    setDay={this.setDay} />)}
                    </div>
                </div>  
            </div>
        );
    }
}

export default HabitList;