import type React from "react";
import type { Event } from "../../../../common/types";
import {
	Calendar,
	Clock,
	MapPin,
	Users,
} from "lucide-react";

const EventItem: React.FC<Event> = ({
	title,
	description,
	date,
	location,
	capacity,
	isMyEvent,
	number_of_participants
}) => {
	return (
		<div
			className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm flex flex-col justify-between hover:shadow-md transition duration-300"
		>
			<div>
				<h3
					className={`text-xl font-bold mb-3 ${isMyEvent ? "text-indigo-600" : "text-slate-800"}`}
				>
					{title}
				</h3>
				<p className="text-slate-500 text-sm leading-relaxed mb-6">
					{description}
				</p>

				<div className="space-y-3 mb-8">
					<div className="flex items-center text-slate-400 text-sm">
						<Calendar size={16} className="mr-3" />
						<span>{date}</span>
					</div>
					<div className="flex items-center text-slate-400 text-sm">
						<Clock size={16} className="mr-3" />
						<span>{date}</span>
					</div>
					<div className="flex items-center text-slate-400 text-sm">
						<MapPin size={16} className="mr-3" />
						<span>{ location}</span>
					</div>
					<div className="flex items-center text-slate-400 text-sm">
						<Users size={16} className="mr-3" />
						<span>{number_of_participants} / {capacity} participants</span>
					</div>
				</div>
			</div>

			<button
				type="button"
				className="w-full bg-emerald-600 text-white py-3 rounded-xl font-semibold hover:bg-emerald-700 transition shadow-lg shadow-emerald-100"
			>
				Join Event
			</button>
		</div>
	)
};

export { EventItem };
