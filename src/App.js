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
      habits: this.habitStorage.get(),
      id: null
    }

    this.update = this.update.bind(this);
    this.setId = this.setId.bind(this);
    this.toggleEditor = this.toggleEditor.bind(this);

    this.habitFormElement = React.createRef();
  }

  update() {
    this.setState({
      habits: this.habitStorage.get()
    });
  }

  setId(id) {
    this.setState({ id });
  }

  toggleEditor(e) {
    this.habitFormElement.current.toggle(e);
    this.habitFormElement.current.populateState();
  }

  render() {
    return (
      <>
        <HabitForm storage={this.habitStorage} update={this.update}
        ref={this.habitFormElement} toggleEditor={this.toggleEditor}
        id={this.state.id} setId={this.setId} />
        <HabitList storage={this.habitStorage} update={this.update}
        id={this.state.id} habits={this.state.habits} setId={this.setId}
        toggleEditor={this.toggleEditor} />
      </>
    );
  }
}

export default App;
