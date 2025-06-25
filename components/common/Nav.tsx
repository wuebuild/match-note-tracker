'use client'
import { useEffect, useState } from "react"
import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

import { signOut } from "next-auth/react";
import DialogComponent from "../tailwind/DialogComponent";
import Auth from "../auth";

function Nav ({

}) {

    const [ isOpenMenu, setIsOpenMenu ] = useState(false)
    const [ openDialog, setOpenDialog ] = useState(false)
    const [ session, setSession ] = useState<string | null>(null);
    const pathName = usePathname()
    

    useEffect(() => {
        const accessToken = localStorage.getItem('mgm_access_token')
        setSession(accessToken)
    }, [])

    const checkPath = (path: any) => {
        return pathName == path ? `rounded-md bg-gray-900 px-3 py-2 text-sm font-medium text-white` : `rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white`
    }

    const checkPathMobile = (path:any) => {
        return pathName == path ? `block rounded-md bg-gray-900 px-3 py-2 text-base font-medium text-white` : `block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white`
    }
    
    return (
        <nav className="bg-gray-800 sticky top-0 z-2">
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                <div className="relative flex h-16 items-center justify-between">
                <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                    <button type="button" className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:ring-2 focus:ring-white focus:outline-hidden focus:ring-inset" aria-controls="mobile-menu" aria-expanded="false"
                        onClick={() => { setIsOpenMenu(!isOpenMenu) }}
                    >
                        <span className="absolute -inset-0.5"></span>
                        <span className="sr-only">Open main menu</span>
                        {
                            !isOpenMenu && 
                            <svg className="block size-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                            </svg>
                        }
                        {
                            isOpenMenu &&
                            <svg className="block size-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                            </svg>
                        }
                    </button>
                </div>
                <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                    <div className="flex shrink-0 items-center">
                        <Image className="h-8 w-auto rounded-sm" src="/logo_.png" width={30} height={30} alt="Match Note Maker"/>
                    </div>
                    <div className="hidden sm:ml-6 sm:block">
                        <div className="flex space-x-4">
                            <Link href="/" className={checkPath('/')} aria-current="page">Dashboard</Link>
                            <Link href="/notes" className={checkPath('/notes')}>Match Notes</Link>
                        </div>
                    </div>
                </div>
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                    {/* <button type="button" className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 focus:outline-hidden">
                        <span className="absolute -inset-1.5"></span>
                        <span className="sr-only">View notifications</span>
                        <svg className="size-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" />
                        </svg>
                    </button> */}
                    <div className="relative ml-3">
                        <div>
                            {
                                !session ?
                                <button type="button" className="relative bg-green-800 px-4 py-2 flex rounded-[10px] text-sm focus:ring-1 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 focus:outline-hidden text-white cursor-pointer" id="user-menu-button" aria-expanded="false" aria-haspopup="true"
                                    onClick={() => {
                                        // window.location.href = '/auth/login'       
                                        setOpenDialog(true)                                 
                                    }}
                                >
                                    Sign In
                                </button>
                                :
                                <button type="button" className="relative bg-green-800 px-4 py-2 flex rounded-[10px] text-sm focus:ring-1 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 focus:outline-hidden text-white cursor-pointer" id="user-menu-button" aria-expanded="false" aria-haspopup="true"
                                    onClick={() => { signOut(); localStorage.clear() }}
                                >
                                    Sign Out
                                </button>
                            }
                        </div>
                    </div>
                </div>
                </div>
            </div>
            {
                isOpenMenu &&
                <div className="sm:hidden" id="mobile-menu">
                    <div className="space-y-1 px-2 pt-2 pb-3">
                    <Link href="/" className={checkPathMobile('/')} aria-current="page">Dashboard</Link>
                    <Link href="/notes" className={checkPathMobile('/notes')}>Match Notes</Link>
                    </div>
                </div>
            }
            <DialogComponent open={openDialog} setOpenDialog={() => { setOpenDialog(!openDialog) }}>
                <Auth />
            </DialogComponent>
        </nav>

    )
}

export default Nav