import { Outlet } from 'react-router-dom'

export function AuthLayout() {
  return (
    <>
      <h1>cabeçalho da autenticacao</h1>

      <div>
        <Outlet />
      </div>
    </>
  )
}
