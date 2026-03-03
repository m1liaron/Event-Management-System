import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import type { User } from "../common/types";

interface UserState {
    user: User | null;
    isAuthenticated: boolean;
    setUser: (user: User) => void;
    logout: () => void;
}

const useUserStore = create<UserState>()(
    persist(
        (set) => ({
            user: null,
            isAuthenticated: false,

            setUser: (user) => set({
                user,
                isAuthenticated: true,
            }),

            logout: () => set({
                user: null,
                isAuthenticated: false
            })
        }),
        {
            name: 'user-storage',
            storage: createJSONStorage(() => localStorage)
        }
    )
);

export { useUserStore };