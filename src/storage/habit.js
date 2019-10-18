class HabitList {
    constructor() {
        const habits = localStorage.getItem('habit_tracker[habits]');
        this.habits = JSON.parse(habits) || [];
        this.habits.forEach(habit => {
            habit.startDate = new Date(habit.startDate);
        });

        const id = localStorage.getItem('habit_tracker[id]');
        this.id = Number(id) || 0;
    }

    add(options) {
        const id = this._newId();
        const { name, startDate, duration, type } = options;
        this._newHabitData();
        this.habits.push({ id, name, startDate, duration, type });
        this.save();
    }

    save() {
        localStorage.setItem('habit_tracker[habits]', JSON.stringify(this.habits));
        localStorage.setItem('habit_tracker[id]', this.id);
    }

    _newId() {
        this.id += 1;
        return this.id;
    }

    get(id) {
        if (id) {
            return this.habits.filter(habit => habit.id === id)[0];
        }

        return this.habits;
    }

    remove(id) {
        this._newHabitData();
        this.habits = this.habits.filter(habit => habit.id !== id);
        this.save();
    }

    update(id, options) {
        const habit = this.get(id);
        const { name, startDate, duration, type } = options;
        const updatedHabit = Object.assign({}, habit, 
            { id, name, startDate, duration, type });
        const index = this.habits.indexOf(habit);
        
        this._newHabitData();
        this.habits[index] = updatedHabit;
        this.save();
    }

    _newHabitData() {
        this.habits = [...this.habits];
    }
}

export default HabitList;