
type Event = {
    id: string
    title: string;
    description: string;
    date: string;
    location: string;
    capacity: number | null;
    visibility: "Public" | "Private"
}

export type { Event };