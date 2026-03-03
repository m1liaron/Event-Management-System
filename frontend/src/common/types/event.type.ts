type Event = {
	id: string;
	title: string;
	description: string;
	date: string;
	location: string;
	capacity: number | null;
	visibility: "Public" | "Private";
	isMyEvent: boolean;
	participantsCount: number;
	isJoined: boolean;
};

export type { Event };
