import { createBrowserRouter } from 'react-router-dom'
import WelcomePage from '../pages/WelcomePage'
import Login from '../pages/Login/Login'
import Register from '../pages/Register/Register'

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
])
