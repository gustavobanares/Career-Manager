import { RouterProvider } from 'react-router'
import { privateRoutes, publicRoutes } from './routes'
import { useContext } from 'react'
import { authContext } from './context/auth-context'

export function App() {
  const { isAuthenticated } = useContext(authContext)

  return isAuthenticated ? (
    <RouterProvider router={privateRoutes} />
  ) : (
    <RouterProvider router={publicRoutes} />
  )
}
