import { Navigate, Outlet } from 'react-router-dom'
import { useAuthStore } from '../store/authStore'

interface Props {
    allowedRoles: Array<'VOLUNTEER' | 'USER' | 'ADMIN'>
}

export const ProtectedRoute = ({ allowedRoles }: Props) => {
    const { access_token, user } = useAuthStore()

    if (!access_token) {
        return <Navigate to="/auth/login" replace />
    }

    if (user && !allowedRoles.includes(user.role)) {
        return <Navigate to="/unauthorized" replace />
    }

    return <Outlet />
}
