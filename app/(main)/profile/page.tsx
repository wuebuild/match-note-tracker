'use client'
import { useEffect } from "react"
import { useRouter } from "next/navigation"

// Stable /profile URL that resolves to the logged-in user's public analyst page.
export default function ProfileRedirect() {
    const router = useRouter()
    useEffect(() => {
        let id: string | null = null
        try { id = JSON.parse(localStorage.getItem('mgm_user') || 'null')?.id || null } catch {}
        router.replace(id ? `/analyst/${id}` : '/app')
    }, [router])

    return <div className="mx-auto max-w-md px-4 py-16 text-center text-sm text-muted">Opening your profile...</div>
}
