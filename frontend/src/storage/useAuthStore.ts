import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import type { User } from "../common/types";

interface UserState {
    user: User | null;
    isAuthenticated: boolean;
    setUser: (user: User) => void;
    logout: () => void;
    isLoading: boolean;
}

const useUserStore = create<UserState>()(
    persist(
        (set) => ({
            user: null,
            isAuthenticated: false,
            isLoading: true,

            setUser: (user) => set({
                user,
                isAuthenticated: true,
                isLoading: false
            }),

            logout: () => set({
                user: null,
                isAuthenticated: false,
                isLoading: false
            })
        }),
        {
            name: 'user-storage',
            storage: createJSONStorage(() => localStorage)
        }
    )
);

export { useUserStore };