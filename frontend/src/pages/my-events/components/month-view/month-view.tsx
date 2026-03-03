import type { Event } from "../../../../common/types";

interface MonthViewProps {
  days: number[];
  padding: number[];
  daysInMonth: number;
  startDayPadding: number;
  currentDate: Date;
  eventsByDay: Record<number, Event[]>;
}

const MonthView: React.FC<MonthViewProps> = ({ days, padding, daysInMonth, startDayPadding, currentDate, eventsByDay }) => {
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const today = new Date();

  return (
    <div className="border border-slate-200 rounded-xl overflow-hidden shadow-sm">
      <div className="grid grid-cols-7 border-b border-slate-200 bg-slate-50">
        {daysOfWeek.map((day) => (
          <div key={day} className="py-3 text-center text-sm font-semibold text-slate-600 border-r border-slate-200 last:border-r-0">
            {day}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7">
        {padding.map((_, i) => (
          <div key={`pad-${i}`} className="h-32 border-b border-r border-slate-200 bg-slate-50/30" />
        ))}
        {days.map((day) => {
          const dayEvents = eventsByDay[day] || [];
          const isToday = 
            day === today.getDate() && 
            currentDate.getMonth() === today.getMonth() && 
            currentDate.getFullYear() === today.getFullYear();
          const hasEvent = dayEvents.length > 0;

          return (
            <div key={day} className={`h-32 border-b border-r border-slate-200 p-3 hover:bg-slate-50 relative group ${isToday ? 'ring-2 ring-inset ring-[#6366f1] z-10' : ''}`}>
              <span className={`text-sm font-medium ${isToday ? 'text-[#6366f1]' : 'text-slate-500'}`}>{day}</span>
              {dayEvents.map(event => {
                const eventDate = new Date(event.date);
                const time = eventDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

                return (
                  <div
                    key={event.id}
                    className="mt-2 bg-[#eef2ff] text-[#4f46e5] text-[11px] px-2 py-1.5 rounded-md border border-[#c7d2fe] font-semibold"
                  >
                    <span className="opacity-70">{time} - </span>
                    <span className="truncate">{event.title}</span>
                  </div>
                );
              })}
            </div>
          );
        })}
        {Array.from({ length: (7 - ((daysInMonth + startDayPadding) % 7)) % 7 }).map((_, i) => (
          <div key={`end-pad-${i}`} className="h-32 border-b border-r border-slate-200 bg-slate-50/30" />
        ))}
      </div>
    </div>
  );
};

export { MonthView };