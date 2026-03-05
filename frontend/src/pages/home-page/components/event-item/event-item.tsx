import React from "react";
import type { Event } from "../../../../common/types";
import {
	Calendar,
	Clock,
	MapPin,
	Users,
	X,
} from "lucide-react";
import { useUserStore } from "../../../../storage/useAuthStore";
import { Link } from "react-router";
import { appPath } from "../../../../common/enums";

interface EventItemProps extends Event {
	handleJoin: (eventId: string) => void;
	handleLeave: (eventId: string) => void;
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
	handleJoin,
	handleLeave,
	removeEvent
}) => {
	const { user } = useUserStore();

	/**
	 * Conditionals used for clearness instead of operators because using 2 conditionals in return would be unclear.
	 * @returns React.FC
	 */
	const renderActionButtons = () => {
		const isOrganizer = organizer.id === user?.id;
		const isFull = participantsCount === capacity;

		if (isOrganizer) {
        return (
            <div className="w-full py-3 text-center bg-slate-100 rounded-xl text-slate-500 font-medium text-sm">
                You are the organizer
            </div>
        );
    }

    // 2. Already Joined State
    if (isJoined) {
        return (
            <button
                type="button"
                onClick={() => handleLeave(id)}
                className="cursor-pointer w-full py-3 rounded-xl bg-rose-50 border border-rose-100 text-rose-600 hover:bg-rose-100 font-bold transition"
            >
                Leave Event
            </button>
        );
    }

    // 3. Event Full State
    if (isFull) {
        return (
            <div className="w-full py-3 text-center bg-amber-50 rounded-xl text-amber-600 font-bold border border-amber-100">
                Event is full
            </div>
        );
    }

    // 4. Default: Join State
    return (
        <button
            type="button"
            onClick={() => handleJoin(id)}
            className="cursor-pointer w-full py-3 rounded-xl bg-emerald-600 text-white hover:bg-emerald-700 font-bold shadow-lg shadow-emerald-100 transition"
        >
            Join Event
        </button>
    );
	}

	return (
		<div
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
						<span>{new Date(date).toLocaleDateString()}</span>
					</div>
					<div className="flex items-center text-slate-400 text-sm">
						<Clock size={16} className="mr-3" />
						<span>{new Date(date).toLocaleTimeString().slice(0,5)}</span>
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
		    {renderActionButtons()}
			<Link to={appPath.EVENT_DETAILS.replace(":eventId", id)} className="mt-1 w-full py-3 text-center bg-green-300 rounded-xl text-slate-500 font-medium text-sm">
                Details
            </Link>
		</div>
	)
};

export { EventItem };
