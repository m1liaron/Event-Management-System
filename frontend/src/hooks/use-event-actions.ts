
import { useNavigate } from "react-router";
import { api } from "../api/axios";
import type { Event } from "../common/types";

const useEventActions = (setData: any) => {
    const navigate = useNavigate();

    const handleJoin = async (eventId: string) => {
        try {
            await api.post(`/events/${eventId}/join`);
            // Update state for either a single event or an array of events
            setData((prev: Event) => {
                if (!prev) return prev;
                // Logic for single event
                if (!Array.isArray(prev)) return { ...prev, isJoined: true };
                // Logic for list
                return prev.map(e => e.id === eventId ? { ...e, isJoined: true } : e);
            });
        } catch (err) {
            console.error("Failed to join event", err);
        }
    };

    const handleLeave = async (eventId: string) => {
        try {
            await api.post(`/events/${eventId}/leave`);
            setData((prev: Event) => {
                if (!prev) return prev;
                if (!Array.isArray(prev)) return { ...prev, isJoined: false };
                return prev.map(e => e.id === eventId ? { ...e, isJoined: false } : e);
            });
        } catch (err) {
            console.error("Failed to leave event", err);
        }
    };

    const handleRemove = async (eventId: string) => {
        try {
            await api.delete(`/events/${eventId}`);
            setData((prev: Event) => {
                if (!prev) return prev;
                if (!Array.isArray(prev)) return null;
                return prev.filter(e => e.id !== eventId);
            });
            navigate(-1);
        } catch (err) {
            console.error("Failed to delete event", err);
        }
    };

    return { handleJoin, handleLeave, handleRemove };
};

export { useEventActions };