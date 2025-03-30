import { CgMenu } from 'react-icons/cg'
import { FaHome } from 'react-icons/fa'
import { NavLink, useNavigate } from 'react-router-dom'
import { Sheet, SheetTrigger, SheetContent } from '@/components/ui/sheet'
import { PiSignOutBold } from 'react-icons/pi'
import { TooltipProvider } from '@radix-ui/react-tooltip'
import { Tooltip, TooltipContent, TooltipTrigger } from './ui/tooltip'
import { useContext } from 'react'
import { authContext } from '@/context/auth-context'
import { toastSuccessStyle } from '@/lib/toast-success-style'
import { GrDocumentText } from 'react-icons/gr'
import toast from 'react-hot-toast'

export function SideBar() {
  const { signOut } = useContext(authContext)
  const navigate = useNavigate()

  return (
    <>
      <div className="bg-[#5254f3] h-24 flex justify-between items-center md:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <div className="pl-2">
              <CgMenu size={50} color="white" />
            </div>
          </SheetTrigger>
          <SheetContent>
            <nav>
              <div>
                <button
                  onClick={() => {
                    signOut()
                    toast.success('See you later!', toastSuccessStyle)
                    navigate('/sign-in')
                  }}
                  className="flex items-center pl-3 rounded-lg transition-colors hover:text-foreground pt-10 gap-4 outline-none"
                >
                  <PiSignOutBold size={40} color="#5254f3" />
                  <span className="font-bold text-[#151788]">Sign-out</span>
                </button>
              </div>
            </nav>
          </SheetContent>
        </Sheet>

        <button
          className="pr-2 cursor-pointer"
          onClick={() => {
            signOut()
            toast.success('See you later!', toastSuccessStyle)
            navigate('/sign-in')
          }}
        >
          <PiSignOutBold size={40} color="white" />
        </button>
      </div>

      <aside className="h-full inset-y-0 left-0 z-10 hidden w-20 border-r bg-[#5254f3] md:flex justify-center">
        <nav className="flex flex-col justify-around">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <NavLink to={'/'}>
                  <FaHome size={40} color="white" />
                </NavLink>
              </TooltipTrigger>
              <TooltipContent side="right">Home</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <NavLink to={'/cv-manager'}>
                  <GrDocumentText size={40} color="white" />
                </NavLink>
              </TooltipTrigger>
              <TooltipContent side="right">Home</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  className="cursor-pointer"
                  onClick={() => {
                    signOut()
                    toast.success('See you later!', toastSuccessStyle)
                    navigate('/sign-in')
                  }}
                >
                  <PiSignOutBold size={40} color="white" />
                </button>
              </TooltipTrigger>
              <TooltipContent side="right">Sign out</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </nav>
      </aside>
    </>
  )
}
