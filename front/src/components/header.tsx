import { authContext } from '@/context/auth-context'
import { useContext } from 'react'

export function Header() {
  const { user } = useContext(authContext)

  const firstUserName =
    user?.name.slice(0, user?.name.indexOf(' ')) || user?.name

  return (
    <div className="flex justify-between h-full items-center">
      <h1 className="pl-20 text-4xl">Bem vindo(a), {firstUserName}!</h1>
    </div>
  )
}
