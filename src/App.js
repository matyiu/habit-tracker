import React from 'react';
import './App.scss';
import HabitForm from './HabitForm';
import Habit from './components/Habit';
import HabitList from './storage/habit';
import HabitOptions from './components/dropdown/HabitOptions';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.habitList = new HabitList();
    this.state = {
      habits: this.habitList.get(),
      dropdown: false,
      activeCoords: {}
    }

    this.update = this.update.bind(this);
    this.displayHabitOptions = this.displayHabitOptions.bind(this);
    this.dropdownClickOutside = this.dropdownClickOutside.bind(this);
    this.setId = this.setId.bind(this);
  }

  update() {
    this.setState({
      habits: this.habitList.get()
    });
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

  dropdownClickOutside() {
    if (this.state.dropdown) {
      this.setState({ dropdown: false });
    }
  }

  setId(id) {
    this.setState({ id });
  }

  componentDidMount() {
    window.addEventListener('click', this.dropdownClickOutside);
  }

  componentWillUnmount() {
    window.removeEventListener('click', this.dropdownClickOutside)
  }

  render() {
    return (
      <>
        <HabitForm storage={this.habitList} update={this.update} />
        <div className="habit-list">
          <div className="container">
            <div className="row row--column">
              { this.state.dropdown &&
              <HabitOptions 
              storage={this.habitList}
              update={this.update}
              coords={this.state.activeCoords}
              id={this.state.id} /> }
              {this.state.habits.map(habit => 
              <Habit key={ habit.id } habitOptions={habit}
              displayHabitOptions={this.displayHabitOptions}
              setId={this.setId} />)}
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default App;
