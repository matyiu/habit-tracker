import React from 'react';
import './App.scss';
import HabitForm from './HabitForm';
import Habit from './components/Habit';
import HabitList from './storage/habit';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.habitList = new HabitList();
    this.state = {
      habits: this.habitList.get()
    }

    this.update = this.update.bind(this);
  }

  update() {
    console.log(this.habitList);
    this.setState({
      habits: this.habitList.get()
    });
  }

  render() {
    return (
      <>
        <HabitForm storage={this.habitList} update={this.update} />
        <div className="habit-list">
          <div className="container">
            <div className="row row--column">
              {this.state.habits.map(habit => <Habit key={ habit.id } />)}
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default App;
