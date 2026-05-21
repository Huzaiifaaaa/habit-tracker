import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function Header({ onShiftWeek, onResetToday, habitCount }) {
    return (
        <header className="app-header">
            <h1 className="app-title">Habit Tracker</h1>
            {habitCount > 0 && (
                <div className="nav-toolbar">
                    <button className="btn-nav" onClick={() => onShiftWeek(-7)}><ChevronLeft size={16} style={{ marginRight: '4px', verticalAlign: 'middle' }} /> Previous </button>
                    <button className="btn-nav btn-today" onClick={onResetToday}> Today</button>
                    <button className="btn-nav" onClick={() => onShiftWeek(7)}> Next <ChevronRight size={16} style={{ marginLeft: '4px', verticalAlign: 'middle' }} /></button>
                </div>
            )}
        </header>
    );
}