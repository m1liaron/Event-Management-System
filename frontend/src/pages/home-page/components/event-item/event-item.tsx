import type React from "react";
import type { Event } from "../../../../common/types";
import {
	Calendar,
	Clock,
	MapPin,
	Users,
	X,
} from "lucide-react";
import { api } from "../../../../api/axios";
import { useUserStore } from "../../../../storage/useAuthStore";
import { Link } from "react-router";
import { appPath } from "../../../../common/enums";

interface EventItemProps extends Event {
	updateEvent: (eventId: string, key: string, value: string | boolean) => void;
	removeEvent: (eventId: string) => void;
}

const EventItem: React.FC<EventItemProps> = ({
	id,
	title,
	description,
	date,
	location,
	capacity = 0,
	isMyEvent,
	participantsCount,
	isJoined,
	organizer,
	updateEvent,
	removeEvent
}) => {
	const { user } = useUserStore();

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
		<Link
			to={appPath.EVENT_DETAILS.replace(":eventId", id)}
			key={id}
			className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm flex flex-col justify-between hover:shadow-md transition duration-300"
		>
			<div className="wrap-anywhere">
				<div className="flex align-items-center justify-between">
					<h3
					className={`text-xl font-bold mb-3 ${isMyEvent ? "text-indigo-600" : "text-slate-800"}`}
					>
						{title.length > 40 ? `${title.slice(0, 40)}...` : title}
					</h3>
					{user?.id === organizer?.id && (
						<button className="cursor-pointer" type="button" onClick={() => removeEvent(id)}>
							<X/>
						</button>
					)}
				</div>

				<p className="text-slate-500 text-sm leading-relaxed mb-6">
					{description.length > 100 ? `${description.slice(0, 100)}...` : description}
				</p>

				<div className="space-y-3 mb-8">
					<div className="flex items-center text-slate-400 text-sm">
						<Calendar size={16} className="mr-3" />
						<span>{date}</span>
					</div>
					<div className="flex items-center text-slate-400 text-sm">
						<Clock size={16} className="mr-3" />
						<span>{new Date(date).getHours()}:{new Date(date).getMinutes()}</span>
					</div>
					<div className="flex items-center text-slate-400 text-sm">
						<MapPin size={16} className="mr-3" />
						<span>{location}</span>
					</div>
					<div className="flex items-center text-slate-400 text-sm">
						<Users size={16} className="mr-3" />
						<span>{participantsCount || 0} / {capacity} participants</span>
					</div>
				</div>
			</div>
			{isJoined ? (
				<button
					type="button"
					onClick={() => handleLeaveEvent(id)}
					className="cursor-pointer w-full py-3 rounded-xl bg-red-400 hover:bg-red-700 font-semibold transition"
				>
					<span className="font-medium">Leave Event</span>
				</button>
			) : participantsCount === capacity ? 
				 <span>Event is full</span> 
				: <button
						type="button"
						onClick={() => handleJoinEvent(id)}
						disabled={isJoined}
						className={`cursor-pointer w-full py-3 rounded-xl font-semibold transition
							${isJoined
								? "bg-gray-400 cursor-not-allowed"
								: "bg-emerald-600 hover:bg-emerald-700"}
						`}
					>
						Join Event
					</button>	 
			}
		</Link>
	)
};

export { EventItem };
