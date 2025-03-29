import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useContext } from 'react'
import { authContext } from './context/auth-context'
import { Dashboard } from './pages/app/dashboard'
import { SignIn } from './pages/auth/sign-in'
import { AppLayout } from './layout/app'
import { SignUp } from './pages/auth/sign-up'
import { LandingPage } from './pages/app/landing-page'

export function App() {
  const { isAuthenticated } = useContext(authContext)

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={isAuthenticated ? <AppLayout /> : <LandingPage />}
        >
          {isAuthenticated && <Route index element={<Dashboard />} />}
        </Route>

        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  )
}
