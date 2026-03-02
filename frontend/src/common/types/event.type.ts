type Event = {
	id: string;
	title: string;
	description: string;
	date: string;
	location: string;
	capacity: number | null;
	visibility: "Public" | "Private";
	isMyEvent: boolean;
	number_of_participants: number;
};

export type { Event };
