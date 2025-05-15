import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { jwtDecode } from 'jwt-decode';
import AsyncStorage from '@react-native-async-storage/async-storage';

type SessionTokenStore = {
  sessionToken: string | null;
  setSessionToken: (token: string | null) => void;
  getValidToken: () => string | null;
};

export const useSessionTokenStore = create<SessionTokenStore>()(
  persist(
    (set, get) => ({
      sessionToken: null,

      setSessionToken: (token) => {
        console.log("setSessionToken");
        set({ sessionToken: token })
      },

      getValidToken: () => {
        const token = get().sessionToken;
        if (!token) return null;

        try {
          const { exp } = jwtDecode(token);
          const now = Math.floor(Date.now() / 1000);
          return exp && exp > now ? token : null;
        } catch (err) {
          return null;
        }
      },
    }),
    {
      name: 'session-token-storage',
      storage: createJSONStorage(() => AsyncStorage)
    }
  )
);
