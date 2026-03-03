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
	isJoined: boolean;
	organizerId: string
};

export type { Event };
