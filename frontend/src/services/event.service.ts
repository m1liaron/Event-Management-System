import type { Event } from "../common/types";
import { apiRequest } from "./api.service";
import { api } from "./axios";


const EventService = {
    getAll: () => apiRequest<Event[]>(api.get("/events")),

    getOne: (id: string) => apiRequest<Event>(api.get(`/events/${id}`)),

    create: (data: Event) => apiRequest<Event>(api.post("/events", data)),

    update: (id: string, data: Event) => apiRequest<Event>(api.patch(`/events/${id}`, data)),

    delete: (id: string) => apiRequest<void>(api.delete(`/events/${id}`)),

    join: (id: string) => apiRequest<Event>(api.post(`/events/${id}/join`)),
    leave: (id: string) => apiRequest<Event>(api.post(`/events/${id}/leave`)),
};

export { EventService };