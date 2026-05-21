import React, { useState } from 'react';
import Habit from '../models/Habit';

export default function New({ onAddHabit }) {
  const [habitName, setHabitName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault(); 
    if (!habitName.trim()) return;

    const newHabitInstance = new Habit(habitName);
    const plainHabitObject = { ...newHabitInstance };
    onAddHabit(plainHabitObject);
    setHabitName('');
  };

  return (
    <div className="new-habit-container">
      <form onSubmit={handleSubmit} className="new-habit-form">
        <input type="text" className="input-field" placeholder="Type and press Enter..." value={habitName} onChange={(e) => setHabitName(e.target.value)}/>
        <button type="submit" className="btn-submit">Add Habit</button>
      </form>
    </div>
  );
}