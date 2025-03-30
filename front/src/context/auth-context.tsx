/* esse código foi feito com ajuda de IA */

import { api } from '@/lib/axios'
import { createContext, useEffect, useState } from 'react'

interface User {
  id: string
  name: string
  email: string
}

interface AuthContextProps {
  isAuthenticated: boolean
  user: User | null
  signIn: (token: string) => void
  signOut: () => void
}

export const authContext = createContext({} as AuthContextProps)
export const accessTokenKey = 'accessTokenTime5'

function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const token = localStorage.getItem(accessTokenKey)

    if (token) return true
    return false
  })

  const [user, setUser] = useState<User | null>(null)

  function signIn(token: string) {
    localStorage.setItem(accessTokenKey, token)
    setIsAuthenticated(true)
  }

  function signOut() {
    localStorage.removeItem(accessTokenKey)
    setIsAuthenticated(false)
  }

  useEffect(() => {
    if (isAuthenticated) {
      fetchUser()
    }

    async function fetchUser() {
      try {
        const { data } = await api.get('/user')
        const user = data.user
        setUser(user)
      } catch {
        signOut()
      }
    }
  }, [isAuthenticated])

  return (
    <authContext.Provider value={{ isAuthenticated, user, signIn, signOut }}>
      {children}
    </authContext.Provider>
  )
}

export default AuthProvider
