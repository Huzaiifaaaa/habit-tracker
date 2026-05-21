import React from 'react';

import { Trash } from 'lucide-react';

export default function Habit({ habitItem, weekDays, formatDateKey, onToggleCell, onDeleteHabit }) {
  const completionSet = new Set(habitItem.completions || []);

  const calculateStreak = () => {
    let streak = 0;
    let checkDate = new Date();
    let todayStr = formatDateKey(checkDate);

    if (!completionSet.has(todayStr)) {
      checkDate.setDate(checkDate.getDate() - 1);
    }

    while (true) {
      const currentStr = formatDateKey(checkDate);
      if (completionSet.has(currentStr)) {
        streak++;
        checkDate.setDate(checkDate.getDate() - 1);
      } else {
        break;
      }
    }
    return streak;
  };

  const streakCount = calculateStreak();

  return (
    <tr>
      <td className="habit-title-cell">
        <span>{habitItem.habit}</span>
        <button  className="btn-delete" onClick={() => onDeleteHabit(habitItem.unique_key)} title="Delete habit" > <Trash size={"18"}/> </button>
      </td>
      
      <td style={{ textAlign: 'center' }}>
        <span className={`streak-badge ${streakCount > 0 ? 'streak-active' : 'streak-zero'}`}> {streakCount} {streakCount === 1 ? 'day' : 'days'}</span>
      </td>

      {weekDays.map((dateObj) => {
        const dateStr = formatDateKey(dateObj);
        const isChecked = completionSet.has(dateStr);
        const isToday = dateStr === formatDateKey(new Date());
        return (
          <td key={dateStr} className={isToday ? 'cell-today' : ''} style={{ textAlign: 'center' }}>
            <input type="checkbox" className="checkbox-custom" checked={isChecked} onChange={() => onToggleCell(habitItem.unique_key, dateStr)}/>
          </td>
        );
      })}
    </tr>
  );
}