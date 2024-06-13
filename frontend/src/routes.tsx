import { createBrowserRouter } from 'react-router-dom'
import { AppLayout } from './pages/_layouts/app'
import { Home } from './pages/app/home'
import { SignIn } from './pages/auth/sign-in'
import { AuthLayout } from './pages/_layouts/auth'
import { Profile } from './pages/app/profile'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/profile',
        element: <Profile />,
      },
    ],
  },
  {
    path: '/',
    element: <AuthLayout />,
    children: [{ path: '/sign-in', element: <SignIn /> }],
  },
])
