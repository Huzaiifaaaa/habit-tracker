class Habit {
  constructor(habitName = "") {
    this.unique_key = crypto.randomUUID();
    this.habit = habitName.trim();
    this.completions = [];
  }
}

export default Habit;