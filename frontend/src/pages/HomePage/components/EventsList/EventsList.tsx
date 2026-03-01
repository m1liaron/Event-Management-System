import type React from "react";
import type { Event } from "../../../../common/types";
import { EventItem } from "../EventItem/EventItem";

interface EventsListProps {
    events: Event[]
}

const EventsList: React.FC<EventsListProps> = ({ events }) => {

    return (
        <>
            {events.map((event) => 
            <EventItem
                key={event.id}
                title={event.title} 
                description={event.description} 
                date={event.date} 
                capacity={event.capacity} 
                location={event.location} 
                visibility={event.visibility} 
            />)}
        </>
    )
}

export { EventsList };