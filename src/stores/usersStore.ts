import { create } from "zustand";

interface UsersStore {
    users: { name: string; email: string } | null;

    setUsers: (user: { name: string; email: string }, token: string) => void;
}

export const useUserStore = create<UsersStore>((set) => ({
    users: null,
    setUsers: (users) => set({ users: users }),
}));
