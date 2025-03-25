import { CgMenu } from 'react-icons/cg'
import { FaUser, FaHome } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { Sheet, SheetTrigger, SheetContent } from '@/components/ui/sheet'
import { PiSignOutBold } from 'react-icons/pi'
import { TooltipProvider } from '@radix-ui/react-tooltip'
import { Tooltip, TooltipContent, TooltipTrigger } from './ui/tooltip'

export function SideBar() {
  return (
    <>
      <div className="bg-gray-300 h-24 flex justify-between items-center md:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <div className="pl-2">
              <CgMenu size={50} />
            </div>
          </SheetTrigger>
          <SheetContent>
            <nav>
              <Link
                to={'/sign-in'}
                className="flex items-center justify-center rounded-lg transition-colors hover:text-foreground pt-3 gap-4"
              >
                <PiSignOutBold size={40} />
                <span className="font-bold">Sign-out</span>
              </Link>
            </nav>
          </SheetContent>
        </Sheet>

        <Link to={'/profile'}>
          <div className="pr-2">{<FaUser size={40} color="black" />}</div>
        </Link>
      </div>

      <aside className="h-full inset-y-0 left-0 z-10 hidden w-20 border-r bg-gray-300 md:flex justify-center">
        <nav className="flex flex-col justify-around">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link to={'/'}>
                  <FaHome size={40} />
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Home</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Link to={'/sign-in'}>
                  <PiSignOutBold size={40} />
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Sign out</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </nav>
      </aside>
    </>
  )
}
