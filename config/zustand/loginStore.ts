import { AuthState } from '@/types/auth.types'
import { create } from 'zustand'
import { persist, devtools } from 'zustand/middleware'


// persist only the token
export const useAuthStore = create<AuthState>()(
  devtools(
    persist(
      (set, get) => ({
        token: null,
        name: null,
          userId: null,
        setToken: (token) => set({ token }),
        setName: (name) => set({ name }),
        getToken: () => get().token,
        getName: () => get().name,
        setUserId: (userId) => set({ userId}),
        getUserId: () => get().userId,
        clearAuth: () => set({ token: null, name: null }),
      }),
      {
        name: 'auth-token', 
        partialize: (state) => ({ token: state.token ,userId:state.userId}), 
      }
    )
  )
)
