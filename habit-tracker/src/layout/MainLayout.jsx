import React, { useState, useEffect } from 'react';
import New from '../components/New';
import Header from '../components/Header';
import View from '../components/View';

const formatDateKey = (date) => {
  const offset = date.getTimezoneOffset();
  const localDate = new Date(date.getTime() - (offset * 60 * 1000));
  return localDate.toISOString().split('T')[0];
};

const getWeekDays = (anchorDate) => {
  const current = new Date(anchorDate);
  const dayOfWeek = current.getDay();
  const distanceToMonday = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
  
  const monday = new Date(current);
  monday.setDate(current.getDate() + distanceToMonday);

  const days = [];
  for (let i = 0; i < 7; i++) {
    const nextDay = new Date(monday);
    nextDay.setDate(monday.getDate() + i);
    days.push(nextDay);
  }
  return days;
};

const MainLayout = () => {
  const [habits, setHabits] = useState(() => {
    const saved = localStorage.getItem('habits');
    return saved ? JSON.parse(saved) : [];
  });
  
  const [currentAnchorDate, setCurrentAnchorDate] = useState(new Date());

  useEffect(() => {
    localStorage.setItem('habits', JSON.stringify(habits));
  }, [habits]);

  const weekDays = getWeekDays(currentAnchorDate);

  const handleAddHabit = (newHabitObject) => {
    setHabits((prev) => [...prev, newHabitObject]);
  };

  const handleRenameHabit = (uniqueKey, newName) => {
    if (!newName.trim()) return;
    setHabits((prevHabits) =>
      prevHabits.map((h) => {
        if (h.unique_key !== uniqueKey) return h;
        return { ...h, habit: newName.trim() };
      })
    );
  };

  const handleDeleteHabit = (uniqueKey) => {
    setHabits((prev) => prev.filter((h) => h.unique_key !== uniqueKey));
  };

  const handleToggleCell = (uniqueKey, dateStr) => {
    setHabits((prevHabits) =>
      prevHabits.map((h) => {
        if (h.unique_key !== uniqueKey) return h;

        const completionsArray = h.completions || [];
        const exists = completionsArray.includes(dateStr);
        const updatedCompletions = exists
          ? completionsArray.filter((d) => d !== dateStr)
          : [...completionsArray, dateStr]; 
        return { ...h, completions: updatedCompletions };
      })
    );
  };

  const handleShiftWeek = (days) => {
    setCurrentAnchorDate((prev) => {
      const newDate = new Date(prev);
      newDate.setDate(prev.getDate() + days);
      return newDate;
    });
  };

  const handleResetToday = () => {
    setCurrentAnchorDate(new Date());
  };

  return (
    <div className="app-container">
      <Header onShiftWeek={handleShiftWeek} onResetToday={handleResetToday} habitCount={habits.length}/>
      <New onAddHabit={handleAddHabit} />
      <View habits={habits} weekDays={weekDays} formatDateKey={formatDateKey} onToggleCell={handleToggleCell} onRenameHabit={handleRenameHabit} onDeleteHabit={handleDeleteHabit}/>
    </div>
  );
}

export default MainLayout;