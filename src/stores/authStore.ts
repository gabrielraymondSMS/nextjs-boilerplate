import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface UserPayload {
    name: string;
    email: string;
    [key: string]: any;
  }

interface AuthState {
    user: { name: string; email: string } | null;
    token: string | null;
    setUserFromToken: (token: string) => Promise<void>;
    login: (user: { name: string; email: string }, token: string) => void;
    logout: () => void;
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            user: null,
            setUserFromToken: async (token) => {
                try {
                  const { jwtVerify } = await import("jose"); // dynamic import supaya tidak error di server
                  const secret = new TextEncoder().encode(process.env.NEXT_PUBLIC_JWT_SECRET);
                  const { payload } = await jwtVerify(token, secret);
                  set({
                    token,
                    user: payload as UserPayload,
                  });
                } catch (err) {
                  console.error("Failed to decode token", err);
                  set({ token: null, user: null });
                }
              },
            token: null,
            login: (user, token) => set({ user, token }),
            logout: () => set({ user: null, token: null }),
        }),
        {
            name: "auth-storage",
            skipHydration: true,
            storage: createJSONStorage(() => localStorage),
        }
    )
);
