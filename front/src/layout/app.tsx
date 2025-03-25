import { SideBar } from '@/components/sidebar'
import { Outlet } from 'react-router-dom'

export function AppLayout() {
  return (
    <>
      <div className="flex flex-col md:flex-row h-screen">
        <div>
          <SideBar />
        </div>

        <div className="h-full">
          <Outlet />
        </div>
      </div>
    </>
  )
}
