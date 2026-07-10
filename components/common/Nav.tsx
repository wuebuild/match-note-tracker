'use client'
import { useEffect, useState } from "react"
import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Menu, X, LogOut } from "lucide-react";
import { Button } from "@heroui/react";

import { signOut } from "next-auth/react";
import DialogComponent from "../tailwind/DialogComponent";
import Auth from "../auth";

const NAV_LINKS = [
    { href: '/', label: 'Dashboard' },
    { href: '/notes', label: 'Match Notes' },
    { href: '/teams', label: 'Teams' },
]

function Nav () {

    const [ isOpenMenu, setIsOpenMenu ] = useState(false)
    const [ openDialog, setOpenDialog ] = useState(false)
    const [ session, setSession ] = useState<string | null>(null);
    const pathName = usePathname()

    useEffect(() => {
        const accessToken = localStorage.getItem('mgm_access_token')
        setSession(accessToken)
    }, [])

    useEffect(() => { setIsOpenMenu(false) }, [pathName])

    const linkClass = (path: string) =>
        pathName === path
            ? "rounded-lg bg-pitch-50 px-3 py-2 text-sm font-semibold text-pitch-700"
            : "rounded-lg px-3 py-2 text-sm font-medium text-muted hover:bg-pitch-50 hover:text-pitch-700 transition-colors"

    const mobileLinkClass = (path: string) =>
        pathName === path
            ? "block rounded-lg bg-pitch-50 px-3 py-2.5 text-base font-semibold text-pitch-700"
            : "block rounded-lg px-3 py-2.5 text-base font-medium text-muted hover:bg-pitch-50 hover:text-pitch-700"

    return (
        <nav className="sticky top-0 z-20 border-b border-line bg-white/90 backdrop-blur">
            <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
                <div className="flex items-center gap-8">
                    <Link href="/" className="flex items-center gap-2.5">
                        <Image className="h-8 w-8 rounded-lg" src="/logo_.png" width={32} height={32} alt="Match Note Maker"/>
                        <span className="text-[15px] font-bold tracking-tight text-ink">Match Note <span className="text-pitch-600">Maker</span></span>
                    </Link>
                    <div className="hidden items-center gap-1 sm:flex">
                        {NAV_LINKS.map((link) => (
                            <Link key={link.href} href={link.href} className={linkClass(link.href)}>{link.label}</Link>
                        ))}
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    {
                        !session ?
                        <Button size="sm" onPress={() => { setOpenDialog(true) }}>
                            Sign In
                        </Button>
                        :
                        <Button size="sm" variant="secondary" onPress={() => { signOut(); localStorage.clear() }}>
                            <LogOut size={14} />
                            Sign Out
                        </Button>
                    }
                    <button
                        type="button"
                        className="inline-flex items-center justify-center rounded-lg p-2 text-muted hover:bg-pitch-50 hover:text-pitch-700 sm:hidden"
                        aria-controls="mobile-menu"
                        aria-expanded={isOpenMenu}
                        onClick={() => { setIsOpenMenu(!isOpenMenu) }}
                    >
                        <span className="sr-only">Open main menu</span>
                        {isOpenMenu ? <X size={22} /> : <Menu size={22} />}
                    </button>
                </div>
            </div>
            {
                isOpenMenu &&
                <div className="border-t border-line bg-white sm:hidden" id="mobile-menu">
                    <div className="space-y-1 px-4 py-3">
                        {NAV_LINKS.map((link) => (
                            <Link key={link.href} href={link.href} className={mobileLinkClass(link.href)}>{link.label}</Link>
                        ))}
                    </div>
                </div>
            }
            <DialogComponent open={openDialog} setOpenDialog={() => { setOpenDialog(!openDialog) }} size="sm">
                <Auth />
            </DialogComponent>
        </nav>
    )
}

export default Nav
