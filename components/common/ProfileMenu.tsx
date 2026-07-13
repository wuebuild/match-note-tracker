'use client'
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Dropdown, Label } from "@heroui/react"
import { User, Settings, LogOut } from "lucide-react"
import { signOut } from "next-auth/react"

export default function ProfileMenu({ onOpenSettings }: { onOpenSettings: () => void }) {
    const router = useRouter()
    const [user, setUser] = useState<{ id?: string; name?: string } | null>(null)

    useEffect(() => {
        try { setUser(JSON.parse(localStorage.getItem('mgm_user') || 'null')) } catch {}
    }, [])

    const name = user?.name?.trim() || 'Analyst'
    const initial = name.charAt(0).toUpperCase()

    const handleAction = (key: React.Key) => {
        if (key === 'profile') {
            router.push(user?.id ? `/analyst/${user.id}` : '/notes')
        } else if (key === 'settings') {
            onOpenSettings()
        } else if (key === 'signout') {
            signOut()
            localStorage.clear()
            router.push('/')
        }
    }

    return (
        <Dropdown>
            <Dropdown.Trigger variant="ghost" size="sm" aria-label="Profile menu" className="gap-2 pl-1 pr-2.5">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-pitch-600 text-xs font-bold text-white">{initial}</span>
                <span className="hidden max-w-[120px] truncate text-sm font-semibold text-ink sm:inline">{name}</span>
            </Dropdown.Trigger>
            <Dropdown.Popover placement="bottom end">
                <Dropdown.Menu onAction={handleAction}>
                    <Dropdown.Item id="profile" textValue="My profile">
                        <User size={15} />
                        <Label>My profile</Label>
                    </Dropdown.Item>
                    <Dropdown.Item id="settings" textValue="Settings">
                        <Settings size={15} />
                        <Label>Settings</Label>
                    </Dropdown.Item>
                    <Dropdown.Item id="signout" textValue="Sign out" variant="danger">
                        <LogOut size={15} />
                        <Label>Sign out</Label>
                    </Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown.Popover>
        </Dropdown>
    )
}
