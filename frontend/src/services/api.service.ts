
import { toast } from "react-toastify";

export interface ApiResponse<T> {
    data: T | null;
    error: string | null;
}

export const apiRequest = async <T>(
    request: Promise<any>
): Promise<ApiResponse<T>> => {
    try {
        const response = await request;
        return { data: response.data, error: null };
    } catch (error: any) {
        const message = error.response?.data?.message || error.message || "Request failed";
        toast.error(Array.isArray(message) ? message[0] : message); // Handles NestJS validation arrays
        return { data: null, error: message };
    }
};