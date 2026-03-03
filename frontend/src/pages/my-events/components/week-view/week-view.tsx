import type React from "react";

interface CalendarEvent {
  time: string;
  title: string;
}

interface WeekDay {
  day: string;
  date: number;
  events: CalendarEvent[];
  active?: boolean;
}

interface WeekViewProps {
  weekDays: WeekDay[];
  currentDate: Date;
}

const WeekView: React.FC<WeekViewProps> = ({ weekDays, currentDate }) => 	{
    const today = new Date();
    const isToday = (day: number) => 
            day === today.getDate() && 
            currentDate.getMonth() === today.getMonth() && 
            currentDate.getFullYear() === today.getFullYear();


    return (
        <div className="grid grid-cols-7 gap-4">
            {weekDays.map((item) => (
                <div
                    key={item.date}
                    className={`min-h-[220px] rounded-2xl p-5 border-2 transition-all flex flex-col gap-2 ${
                        isToday(item.date)
                            ? "border-[#6366f1] bg-white shadow-lg shadow-indigo-50"
                            : "border-slate-100 bg-white"
                    }`}
                >
                    <div className="mb-2">
                        <span className="block text-sm font-bold text-slate-900">
                            {item.day}
                        </span>
                        <span
                            className={`text-lg font-bold ${isToday(item.date) ? "text-[#6366f1]" : "text-slate-500"}`}
                        >
                            {item.date}
                        </span>
                    </div>
                    <div className="flex-grow flex flex-col gap-2">
                        {item.events.length > 0 ? (
                            item.events.map((event) => (
                                <div
                                    key={event.time}
                                    className="bg-[#eef2ff] p-3 rounded-xl border border-indigo-50"
                                >
                                    <div className="text-[11px] font-bold text-[#6366f1] leading-tight">
                                        {event.time}
                                    </div>
                                    <div className="text-[11px] font-bold text-[#6366f1] leading-tight">
                                        {event.title}
                                    </div>
                                </div>
                            ))
                        ) : (
                            <span className="text-sm font-medium text-slate-400 mt-2">
                                No events
                            </span>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
};

export { WeekView }