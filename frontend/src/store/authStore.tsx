import { create } from 'zustand'
import { jwtDecode } from 'jwt-decode'
import { persist } from 'zustand/middleware'

interface UserPayload {
    sub: string
    email: string
    role: 'ADMIN' | 'USER' | 'VOLUNTEER'
    exp: number
}

interface AuthState {
    access_token: string | null
    user: UserPayload | null
    setAuth: (access_token: string) => void
    updateUser: (data: Partial<UserPayload>) => void
    logout: () => void
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            access_token: null,
            user: null,
            setAuth: (access_token) => {
                try {
                    const decoded = jwtDecode<UserPayload>(access_token)
                    set({ access_token, user: decoded })
                } catch (error) {
                    console.error('Invalid token:', error)
                }
            },
            updateUser: (data) => {
                set((state) => ({
                    user: state.user ? { ...state.user, ...data } : null,
                }))
            },
            logout: () => {
                set({ access_token: null, user: null })
            },
        }),
        {
            name: 'auth-storage',
        }
    )
)
