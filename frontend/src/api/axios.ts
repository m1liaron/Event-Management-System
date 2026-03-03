import axios from "axios";
import { useUserStore } from "../storage/useAuthStore";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || "http://localhost:4000",
    headers: {
        "Content-Type": "application/json",
    },
    timeout: 10000,
});

api.interceptors.request.use(
    (config) => {
        const token = useUserStore.getState().user?.token;
        if(token) {
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    },				
    (error) => Promise.reject(error)
)

export { api };