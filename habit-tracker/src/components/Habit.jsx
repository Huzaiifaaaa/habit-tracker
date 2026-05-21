import React from 'react';
import { Trash, Edit } from 'lucide-react';

export default function Habit({ habitItem, weekDays, formatDateKey, onToggleCell, onRenameHabit, onDeleteHabit }) {
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

  const handleEditClick = () => {
    const newName = prompt(`Edit habit:`, habitItem.habit);
    if (newName !== null && newName.trim() !== '') {
      onRenameHabit(habitItem.unique_key, newName);
    }
  };

  return (
    <tr>
      <td className="habit-title-cell">
        <span className="habit-text-label">{habitItem.habit}</span>

        <div className="habit-actions-group">
          <button className="btn-action-icon" onClick={handleEditClick} title="Edit habit">
            <Edit size={18} />
          </button>
          <button className="btn-action-icon btn-delete-accent" onClick={() => onDeleteHabit(habitItem.unique_key)} title="Delete habit">
            <Trash size={18} />
          </button>
        </div>
      </td>
      
      <td className="cell-centered">
        <span className={`streak-badge ${streakCount > 0 ? 'streak-active' : 'streak-zero'}`}> 
          {streakCount} {streakCount === 1 ? 'day' : 'days'}
        </span>
      </td>

      {weekDays.map((dateObj) => {
        const dateStr = formatDateKey(dateObj);
        const isChecked = completionSet.has(dateStr);
        const isToday = dateStr === formatDateKey(new Date());
        
        return (
          <td key={dateStr} className={`cell-centered ${isToday ? 'cell-today' : ''}`}>
            <input 
              type="checkbox" 
              className="checkbox-custom" 
              checked={isChecked} 
              onChange={() => onToggleCell(habitItem.unique_key, dateStr)}
            />
          </td>
        );
      })}
    </tr>
  );
}