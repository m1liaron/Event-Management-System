import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react';
import { MonthView } from './components/month-view/month-view';
import { WeekView } from './components/week-view/week-view';

const MyEventsPage: React.FC = () => {
  const [view, setView] = useState<'month' | 'week'>('month');
  const [currentDate, setCurrentDate] = useState(new Date());

  const today = new Date();
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const monthName = currentDate.toLocaleString('default', { month: 'long' });

  // Data helpers
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const startDayPadding = new Date(year, month, 1).getDay();
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const padding = Array.from({ length: startDayPadding }, (_, i) => i);

  const weekDays = Array.from({ length: 7 }, (_, i) => {
    const dayDate = new Date(year, month, i + 1);
    return {
      day: dayDate.toLocaleString('default', { weekday: 'short' }),
      date: dayDate.getDate(),
      events: dayDate.getDate() === 8 ? [{ time: '15:30', title: 'AI Conference' }] : [],
      active: dayDate.getDate() === 6
    };
  });

  return (
    <div className="p-8 bg-white min-h-screen font-sans text-slate-900">
      {/* Header */}
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-4xl font-bold tracking-tight">My Events</h1>
          <p className="text-slate-500 mt-1">View and manage your event calendar</p>
        </div>
        <button type='button' className="flex items-center gap-2 bg-[#6366f1] hover:bg-[#5558e3] text-white px-5 py-2.5 rounded-lg font-medium shadow-sm transition-all">
          <Plus size={20} /> Create Event
        </button>
      </div>

      {/* Controls */}
      <div className="flex justify-between items-center mb-10">
        <div className="flex items-center gap-2">
          <button type='button' onClick={() => setCurrentDate(new Date(year, month - 1, 1))} className="p-1.5 hover:bg-slate-50 rounded-md border border-slate-200 cursor-pointer">
            <ChevronLeft size={18} />
          </button>
          <h2 className="text-2xl font-bold px-4 min-w-[200px] text-center">{monthName} {year}</h2>
          <button type='button' onClick={() => setCurrentDate(new Date(year, month + 1, 1))} className="p-1.5 hover:bg-slate-50 rounded-md border border-slate-200 cursor-pointer">
            <ChevronRight size={18} />
          </button>
          {currentDate.getMonth() !== today.getMonth() && (
            <button type='button' onClick={() => setCurrentDate(new Date())} className="ml-2 px-3 py-1 hover:bg-slate-50 rounded-md border border-slate-200 text-sm font-medium cursor-pointer">
              Today
            </button>
          )}
        </div>

        <div className="flex bg-slate-50 p-1 rounded-xl border border-slate-100">
          {(['month', 'week'] as const).map((v) => (
            <button
			  type='button'
              key={v}
              onClick={() => setView(v)}
              className={`px-6 py-2 rounded-lg font-medium text-sm capitalize transition-all cursor-pointer ${
                view === v ? 'bg-[#6366f1] text-white shadow-md' : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              {v}
            </button>
          ))}
        </div>
      </div>

      {/* Conditional Rendering */}
      {view === 'month' ? (
        <MonthView 
			days={days} 
			padding={padding} 
			daysInMonth={daysInMonth} 
			startDayPadding={startDayPadding} 
			currentDate={currentDate}
		/>
      ) : (
        <WeekView weekDays={weekDays} currentDate={currentDate} />
      )}
    </div>
  );
};

export { MyEventsPage };