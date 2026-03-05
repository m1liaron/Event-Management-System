import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react';
import { MonthView } from './components/month-view/month-view';
import { WeekView } from './components/week-view/week-view';
import { useFetchData } from '../../hooks';
import { appPath } from '../../common/enums';
import { Link } from 'react-router';
import type { Event } from '../../common/types';

const MyEventsPage: React.FC = () => {
  const { data: events } = useFetchData<Event[]>("/users/me/events")
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

  const monthEvents = events?.filter(event => {
    const eventDate = new Date(event.date);
    return (
      eventDate.getMonth() === month &&
      eventDate.getFullYear() === year
    );
  }) ?? [];

  const eventsByDay = monthEvents.reduce<Record<number, Event[]>>(
    (acc, event) => {
      const day = new Date(event.date).getDate();
      if (!acc[day]) acc[day] = [];
      acc[day].push(event);
      return acc;
    },
    {}
  );

  const startOfWeek = new Date(currentDate);
  startOfWeek.setHours(0, 0, 0, 0);

  startOfWeek.setDate(currentDate.getDate() - currentDate.getDay());

  const weekDays = Array.from({ length: 7 }, (_, i) => {
    const date = new Date(startOfWeek);
    date.setDate(startOfWeek.getDate() + i);

    const dayEvents = events?.filter(event => {
      const eventDate = new Date(event.date);
      return (
        eventDate.getFullYear() === date.getFullYear() &&
        eventDate.getMonth() === date.getMonth() &&
        eventDate.getDate() === date.getDate()
      );
    }) ?? [];

    return {
      fullDate: date, // IMPORTANT — pass full Date
      day: date.toLocaleString("default", { weekday: "short" }),
      date: date.getDate(),
      events: dayEvents.map(event => {
        const eventDate = new Date(event.date);
        return {
          time: eventDate.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit"
          }),
          title: event.title
        };
      })
    };
  });

  const handleNext = () => {
    if(view === 'month') {
      setCurrentDate(new Date(year, month + 1, 1));
    } else {
      const nextWeek = new Date(currentDate);
      nextWeek.setDate(currentDate.getDate() + 7); // jump 7 days ahead
      setCurrentDate(nextWeek);
    }
  }

  const handlePrevious = () => {
    if(view === 'month') {
      setCurrentDate(new Date(year, month - 1, 1));
    } else {
      const prevWeek = new Date(currentDate);
      prevWeek.setDate(currentDate.getDate() - 7); // jump 7 days back
      setCurrentDate(prevWeek);
    }
  }

  return (
    <div className="p-8 bg-white min-h-screen font-sans text-slate-900">
      {/* Header */}
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-4xl font-bold tracking-tight">My Events</h1>
          <p className="text-slate-500 mt-1">View and manage your event calendar</p>
          {events?.length === 0 && "You are not part of any events yet. Explore public events and join."}
        </div>
        <Link to={appPath.CREATE_EVENT}>
        <button type='button' className="flex cursor-pointer items-center gap-2 bg-[#6366f1] hover:bg-[#5558e3] text-white px-5 py-2.5 rounded-lg font-medium shadow-sm transition-all">
          <Plus size={20} /> Create Event
        </button>
        </Link>
      </div>

      {/* Controls */}
      <div className="flex justify-between items-center mb-10">
        <div className="flex items-center gap-2">
          <button type='button' onClick={handlePrevious} className="p-1.5 hover:bg-slate-50 rounded-md border border-slate-200 cursor-pointer">
            <ChevronLeft size={18} />
          </button>
          <h2 className="text-2xl font-bold px-4 min-w-[200px] text-center">{monthName} {year}</h2>
          <button type='button' onClick={handleNext} className="p-1.5 hover:bg-slate-50 rounded-md border border-slate-200 cursor-pointer">
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
          eventsByDay={eventsByDay}
        />
      ) : (
        <WeekView weekDays={weekDays} currentDate={currentDate} />
      )}
    </div>
  );
};

export { MyEventsPage };