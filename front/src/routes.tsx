import { createBrowserRouter } from 'react-router-dom'
import Dashboard from './pages/app/dashboard'
import { SignIn } from './pages/auth/sign-in'
import { AppLayout } from './layout/app'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [{ path: '/', element: <Dashboard /> }],
  },
  {
    path: '/sign-in',
    element: <SignIn />,
  },
])
