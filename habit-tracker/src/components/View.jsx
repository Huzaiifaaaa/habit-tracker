import React from 'react';
import Habit from './Habit';

export default function View({ habits, weekDays, formatDateKey, onToggleCell, onRenameHabit, onDeleteHabit }) {
  const todayKey = formatDateKey(new Date());

  if (habits.length === 0) {
    return (
      <div className="empty-state">
        <p className="empty-text">No habits listed yet.</p>
      </div>
    );
  }

  return (
    <div className="matrix-wrapper">
      <table className="matrix-table">
        <thead>
          <tr>
            <th className="col-habit">Habit</th>
            <th className="col-streak">Streak</th>
            {weekDays.map((dateObj) => {
              const dateStr = formatDateKey(dateObj);
              const isToday = dateStr === todayKey;
              return (
                <th key={dateStr} className={`col-day ${isToday ? 'cell-today th-today-label' : ''}`} style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', opacity: 0.7 }}>
                    {dateObj.toLocaleDateString('en-US', { weekday: 'short' })}
                  </div>
                  <div style={{ fontSize: '1.1rem', marginTop: '2px' }}>
                    {dateObj.getDate()}
                  </div>
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {habits.map((item) => (
            <Habit key={item.unique_key} habitItem={item} weekDays={weekDays} formatDateKey={formatDateKey} onToggleCell={onToggleCell} onRenameHabit={onRenameHabit} onDeleteHabit={onDeleteHabit}/>
          ))}
        </tbody>
      </table>
    </div>
  );
}