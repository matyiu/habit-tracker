import React from 'react';
import './App.scss';
import HabitForm from './HabitForm';
import HabitStorage from './storage/habit';
import HabitList from "./components/habit/HabitList";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.habitStorage = new HabitStorage();
    this.state = {
      habits: this.habitStorage.get()
    }

    this.update = this.update.bind(this);
    this.setId = this.setId.bind(this);
  }

  update() {
    this.setState({
      habits: this.habitStorage.get()
    });
  }

  setId(id) {
    this.setState({ id });
  }

  render() {
    return (
      <>
        <HabitForm storage={this.habitStorage} update={this.update} />
        <HabitList storage={this.habitStorage} update={this.update}
        id={this.state.id} habits={this.state.habits} setId={this.setId} />
      </>
    );
  }
}

export default App;
