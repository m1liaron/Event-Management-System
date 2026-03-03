import type { User } from "./user.type";

type Organizer = {
	id: string;
}

type Event = {
	id: string;
	title: string;
	description: string;
	date: string;
	location: string;
	capacity: number | 1;
	visibility: "Public" | "Private";
	isMyEvent: boolean;
	participantsCount: number;
	participants?: User[];
	isJoined: boolean;
	organizer: Organizer
};

export type { Event };
