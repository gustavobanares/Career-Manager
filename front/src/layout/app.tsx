import { Header } from '@/components/header'
import { SideBar } from '@/components/sidebar'
import { Outlet } from 'react-router-dom'

export function AppLayout() {
  return (
    <>
      <div className="flex flex-col w-full md:flex-row h-screen font-dmsans">
        <div>
          <SideBar />
        </div>

        <div className="w-full">
          <div className="h-1/10 hidden md:block fixed">
            <Header />
          </div>

          <div className="h-full">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  )
}
