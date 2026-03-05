import type React from "react";
import type { Event } from "../../../../common/types";
import { EventItem } from "../event-item/event-item";

interface EventsListProps {
	events: Event[] | null;
	handleJoin: (eventId: string) => void;
	handleLeave: (eventId: string) => void;
	removeEvent: (eventId: string) => void;
}

const EventsList: React.FC<EventsListProps> = ({ events, handleJoin, removeEvent, handleLeave }) => {
	return (
		<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
			{events?.map((event) => <EventItem key={event.id} {...event} handleJoin={handleJoin} handleLeave={handleLeave} removeEvent={removeEvent} />)}
		</div>
	);
};

export { EventsList };
