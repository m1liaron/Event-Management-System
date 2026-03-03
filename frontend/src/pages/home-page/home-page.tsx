import React from "react";
import {
	Calendar,
	Clock,
	MapPin,
	Users,
	Search,
} from "lucide-react";
import { useFetchData } from "../../hooks";
import { EventCardSkeleton } from "./components/event-card-skeleton/event-card-skeleton";
import type { Event } from "../../common/types";
import { api } from "../../api/axios";

const HomePage: React.FC = () => {
	const { isLoading, data: events, setData } = useFetchData<Event[]>("/events");

	const updateEvent = (eventId: string, key: string, value: string | boolean) => {
		setData(prev => {
            if (!prev) return prev;

            return prev.map(event =>
                event.id === eventId
                    ? { ...event, [key]: value }
                    : event
            );
        });
	}
	
	const handleJoinEvent = async (eventId: string) => {
		const { data: { participantsCount }} = await api.post(`/events/${eventId}/join`);
		updateEvent(eventId, 'isJoined', true)
		updateEvent(eventId, 'participantsCount', participantsCount)
	}

	const handleLeaveEvent = async (eventId: string) => {
		const { data: { participantsCount }} = await api.post(`/events/${eventId}/leave`);
		await api.post(`/events/${eventId}/leave`);
		updateEvent(eventId, 'isJoined', false)
		updateEvent(eventId, 'participantsCount', participantsCount)
	}

	return (
		<div className="min-h-screen bg-white text-slate-900 font-sans">
			<main className="max-w-7xl mx-auto px-8 py-12">
				<h1 className="text-4xl font-bold mb-2">Discover Events</h1>
				<p className="text-slate-500 text-lg mb-8">
					Find and join exciting events happening around you
				</p>

				<div className="relative max-w-sm mb-12">
					<Search
						className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
						size={18}
					/>
					<input
						type="text"
						placeholder="Search events..."
						className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition shadow-sm"
					/>
				</div>

				{isLoading ? (
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
						{[...Array(6)].map((_, i) => <EventCardSkeleton key={i} />)}
					</div>
				) : (
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
						{events?.map((event) => (
							<div
								key={event.id}
								className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm flex flex-col justify-between hover:shadow-md transition duration-300"
							>
								<div>
									<h3
										className={`text-xl font-bold mb-3 ${event.isMyEvent ? "text-indigo-600" : "text-slate-800"}`}
									>
										{event.title}
									</h3>
									<p className="text-slate-500 text-sm leading-relaxed mb-6">
										{event.description}
									</p>

									<div className="space-y-3 mb-8">
										<div className="flex items-center text-slate-400 text-sm">
											<Calendar size={16} className="mr-3" />
											<span>{event.date}</span>
										</div>
										<div className="flex items-center text-slate-400 text-sm">
											<Clock size={16} className="mr-3" />
											<span>{new Date(event.date).getHours()}:{new Date(event.date).getMinutes()}</span>
										</div>
										<div className="flex items-center text-slate-400 text-sm">
											<MapPin size={16} className="mr-3" />
											<span>{event.location}</span>
										</div>
										<div className="flex items-center text-slate-400 text-sm">
											<Users size={16} className="mr-3" />
											<span>{event.participantsCount || 0} / {event.capacity} participants</span>
										</div>
									</div>
								</div>
								{event.isJoined ? (
									<button
										type="button"
										onClick={() => handleLeaveEvent(event.id)}
										className="cursor-pointer w-full py-3 rounded-xl bg-red-400 hover:bg-red-700 font-semibold transition"
									>
										<span className="font-medium">Leave Event</span>
									</button>
								) : (
									<button
										type="button"
										onClick={() => handleJoinEvent(event.id)}
										disabled={event.isJoined}
										className={`cursor-pointer w-full py-3 rounded-xl font-semibold transition
											${event.isJoined
												? "bg-gray-400 cursor-not-allowed"
												: "bg-emerald-600 hover:bg-emerald-700"}
										`}
									>
										Join Event
									</button>	
								)}
							</div>
						))}
					</div>
				)}
			</main>
		</div>
	);
};

export { HomePage };
