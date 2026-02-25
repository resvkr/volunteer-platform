import { createBrowserRouter, Navigate } from 'react-router-dom'
import WelcomePage from '../pages/WelcomePage'
import Login from '../pages/Login/Login'
import Register from '../pages/Register/Register'
import VolunteerDashboard from '../pages/VolunteerDashboard'
import UserDashboard from '../pages/UserDashboard'
import { ProtectedRoute } from '../components/ProtectedRoute' // Імпортуйте ваш компонент
import NewsDashboard from '../pages/NewsDashboard'

export const router = createBrowserRouter([
    {
        path: '/auth',
        element: <WelcomePage />,
    },
    {
        path: '/auth/login',
        element: <Login />,
    },
    {
        path: '/auth/register',
        element: <Register />,
    },
    {
        path: '/news/dashboard',
        element: <NewsDashboard />,
    },

    {
        element: <ProtectedRoute allowedRoles={['VOLUNTEER']} />,
        children: [
            {
                path: '/volunteer/dashboard',
                element: <VolunteerDashboard />,
            },
        ],
    },

    {
        element: <ProtectedRoute allowedRoles={['USER']} />,
        children: [
            {
                path: '/user/dashboard',
                element: <UserDashboard />,
            },
        ],
    },

    {
        path: '/',
        element: <Navigate to="/auth" replace />,
    },
    {
        path: '/unauthorized',
        element: <div>Not authorized</div>,
    },
])
