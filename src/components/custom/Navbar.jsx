import React, { useEffect, useState } from 'react'
import ThemeToggle from './ThemeToggle'
import logo from '../../assets/logo.png'
import { Link } from 'react-router-dom'
import LogoutButton from './LogoutButton'
import { useUserProfile } from '@/hooks/use-user-profile'
import { useAuth } from '@/Context/AuthProvider'
import { CiLogin } from 'react-icons/ci'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { AiOutlineMenu } from 'react-icons/ai'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { get } from 'idb-keyval'

const Navbar = () => {
  const { user } = useAuth()
  const [userId, setUserId] = useState(null)

  useEffect(() => {
    const fetchUserId = async () => {
      const id = await get('userId') 
      setUserId(id)
    }
    fetchUserId()
  }, [])

  const { data: userProfile } = useUserProfile(userId)

  return (
    <nav className="w-full mx-auto py-2 shadow-md backdrop-saturate-200 backdrop-blur-2xl bg-opacity-80 border bg-background text-foreground sticky z-50">
      <div className="mx-10 flex items-center justify-between">
        <Link to={'/'} className="block font-sans text-lg font-bold">
          <img className="w-10 h-10" src={logo} alt="Logo" />
        </Link>

        {/* Desktop Menu */}
        <div className="items-center hidden gap-6 lg:flex">
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Avatar className="w-7 h-7 cursor-pointer">
                  <AvatarImage
                    src={userProfile?.profileImage}
                    alt={userProfile?.name}
                  />
                  <AvatarFallback>
                    {userProfile?.name?.charAt(0)}
                  </AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="w-40 flex flex-col text-lg text-center px-2 py-2"
              >
                <DropdownMenuItem asChild>
                  <Link to="/profile" className="block">
                    Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <LogoutButton className="w-full" />
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link to="/sign-in">Login</Link>
          )}
          <ThemeToggle />
        </div>

        {/* Mobile Menu */}
        <Sheet>
          <SheetTrigger asChild>
            <button className="lg:hidden">
              <AiOutlineMenu className="w-6 h-6" />
            </button>
          </SheetTrigger>
          <SheetContent side="left" className="w-64 bg-background">
            <div className="pt-6 flex flex-col items-start gap-4">
              {user ? (
                <div className="flex justify-center flex-col gap-4 items-center w-full">
                  <div className="flex flex-col justify-center w-full items-center gap-1 mb-4">
                    <Avatar className="w-16 h-16">
                      <AvatarImage
                        src={userProfile?.profileImage}
                        alt={userProfile?.name}
                      />
                      <AvatarFallback>
                        {userProfile?.name?.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <p className="text-lg font-semibold">{userProfile?.name}</p>
                    <p className="text-sm text-gray-500">
                      {userProfile?.email}
                    </p>
                  </div>
                  <Link to="/profile" className="p-2 block">
                    Profile
                  </Link>
                  <LogoutButton />
                </div>
              ) : (
                <div className="w-full flex justify-center items-center gap-4 mt-5 text-lg">
                  <CiLogin />
                  <Link to="/sign-in">Login</Link>
                </div>
              )}
              <div className="w-full items-center">
                <ThemeToggle text="Theme" />
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  )
}

export default Navbar
