import { SideBar } from '@/components/sidebar'
import { Outlet } from 'react-router-dom'

export function AppLayout() {
  return (
    <>
      <div className="flex flex-col w-full md:flex-row h-screen font-dmsans">
        <div>
          <SideBar />
        </div>

        <div className="h-full w-full">
          <Outlet />
        </div>
      </div>
    </>
  )
}
