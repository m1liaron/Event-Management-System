import React from "react";
import {
	Search,
} from "lucide-react";
import { useEventActions, useFetchData } from "../../hooks";
import { EventCardSkeleton } from "./components/event-card-skeleton/event-card-skeleton";
import type { Event } from "../../common/types";
import { EventsList } from "./components/event-list/event-list";
import { api } from "../../api/axios";
import { v4 as uuidv4 } from 'uuid';

const HomePage: React.FC = () => {
	const { isLoading, data: events, setData } = useFetchData<Event[]>("/events");
	const { handleRemove, handleJoin, handleLeave } = useEventActions(setData);

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
						{[...Array(6)].map((_, i) => <EventCardSkeleton key={uuidv4()} />)}
					</div>
				) : (
					<EventsList events={events} handleLeave={handleLeave} handleJoin={handleJoin} removeEvent={handleRemove} />
				)}
			</main>
		</div>
	);
};

export { HomePage };
