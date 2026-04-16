import { createBrowserRouter, Navigate } from 'react-router-dom'
import WelcomePage from '../pages/Auth/WelcomePage'
import Login from '../pages/Auth/Login/Login'
import Register from '../pages/Auth/Register/Register'
import VolunteerDashboard from '../pages/Dashboards/VolunteerDashboard'
import UserDashboard from '../pages/Dashboards/UserDashboard'
import { ProtectedRoute } from '../components/ProtectedRoute'
import NewsDashboard from '../pages/News/NewsDashboard'
import NewsForm from '../pages/News/NewsForm'
import ThanksNewsPage from '../pages/News/ThanksNewsPage'
import Profile from '../pages/Profile/Profile'
import Unauthorized from '../pages/Unauthorized'
import EditProfile from '../pages/Profile/EditProfile'
import MyRequests from '../pages/Requests/MyReqests'
import CreateRequest from '../pages/Requests/CreateRequest'
import ThanksRequestPage from '../pages/Requests/ThanksRequestPage'
import Request from '../pages/Requests/Request'
import ThanksAcceptPage from '../pages/Requests/ThanksAcceptPage'
import VolunteerSuccess from '../components/VolunteerSuccess'

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
        path: '/news/thanks',
        element: <ThanksNewsPage />,
    },
    {
        path: '/profile/:userId',
        element: <Profile />,
    },
    {
        path: '/unauthorized',
        element: <Unauthorized />,
    },
    {
        path: '/profile/edit/:userId',
        element: <EditProfile />,
    },
    {
        path: '/requests/:userId',
        element: <MyRequests />,
    },
    {
        path: '/requests/create',
        element: <CreateRequest />,
    },
    {
        path: '/requests/success',
        element: <ThanksRequestPage />,
    },
    {
        path: '/requests/success',
        element: <ThanksRequestPage />,
    },
    {
        path: '/become-volunteer/success',
        element: <VolunteerSuccess />,
    },

    {
        element: <ProtectedRoute allowedRoles={['VOLUNTEER']} />,
        children: [
            {
                path: '/volunteer/dashboard',
                element: <VolunteerDashboard />,
            },
            {
                path: '/news/create',
                element: <NewsForm />,
            },
            {
                path: '/requests/details/:requestId',
                element: <Request />,
            },
            {
                path: '/requests/accept/success',
                element: <ThanksAcceptPage />,
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
