'use client'
import { useEffect, useState } from "react"
import Link from "next/link"
import { Card, Skeleton } from "@heroui/react"
import { NotebookPen, Newspaper, Trophy, Shield, User, Plus, CalendarDays } from "lucide-react"
import { loadListNotes } from "@/service/notesService"
import { loadNotes } from "@/utlis/storage/notes"

const TILES = [
    { href: '/fixtures', label: 'Fixtures', desc: 'Pick a match to analyze', icon: CalendarDays },
    { href: '/notes', label: 'My Notes', desc: 'Your prediction journal', icon: NotebookPen },
    { href: '/feed', label: 'Community Feed', desc: 'See what analysts are calling', icon: Newspaper },
    { href: '/leaderboard', label: 'Leaderboard', desc: 'See where you rank', icon: Trophy },
    { href: '/teams', label: 'Teams', desc: 'Follow your clubs', icon: Shield },
]

export default function AppDashboard() {
    const [name, setName] = useState<string | null>(null)
    const [profileId, setProfileId] = useState<string | null>(null)
    const [notes, setNotes] = useState<MatchNotes[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const session = localStorage.getItem('mgm_access_token')
        try {
            const u = JSON.parse(localStorage.getItem('mgm_user') || 'null')
            setName(u?.name || null)
            setProfileId(u?.id || null)
        } catch {}

        const load = async () => {
            if (session) {
                const data = await loadListNotes()
                setNotes(Array.isArray(data) ? data : [])
            } else {
                const data = await loadNotes()
                setNotes(data || [])
            }
            setLoading(false)
        }
        load()
    }, [])

    const settled = notes.filter(n => n.pickResult != null)
    const wins = settled.filter(n => ['true', 'right'].includes(String(n.pickResult).toLowerCase()))
    const points = notes.reduce((sum, n: any) => sum + (Number(n.pointsAwarded) || 0), 0)
    const winRate = settled.length ? Math.round((wins.length / settled.length) * 100) : null

    const tiles = [...TILES]
    if (profileId) {
        tiles.push({ href: `/analyst/${profileId}`, label: 'My Profile', desc: 'Your public analyst page', icon: User })
    }

    return (
        <div className="mx-auto min-h-screen w-full max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
            {/* Greeting + primary action */}
            <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
                        {name ? `Welcome back, ${name}` : 'Your analysis hub'}
                    </h1>
                    <p className="mt-1 text-sm text-muted">Predict before kickoff, record the result, climb the leaderboard.</p>
                </div>
                <Link href="/notes" className="inline-flex items-center gap-2 rounded-lg bg-pitch-700 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-pitch-600">
                    <Plus size={16} />
                    Write a match note
                </Link>
            </div>

            {/* Stats */}
            {loading ? (
                <div className="mb-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
                    {[...Array(4)].map((_, i) => <Skeleton key={i} className="h-20 rounded-2xl" />)}
                </div>
            ) : (
                <div className="mb-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
                    <Card className="px-4 py-3">
                        <div className="text-[11px] uppercase tracking-wide text-muted">Points</div>
                        <div className="text-2xl font-bold text-pitch-700">{points}</div>
                    </Card>
                    <Card className="px-4 py-3">
                        <div className="text-[11px] uppercase tracking-wide text-muted">Picks</div>
                        <div className="text-2xl font-bold">{notes.length}</div>
                    </Card>
                    <Card className="px-4 py-3">
                        <div className="text-[11px] uppercase tracking-wide text-muted">Correct</div>
                        <div className="text-2xl font-bold text-win">{wins.length}</div>
                    </Card>
                    <Card className="px-4 py-3">
                        <div className="text-[11px] uppercase tracking-wide text-muted">Win rate</div>
                        <div className="text-2xl font-bold">{winRate != null ? `${winRate}%` : '0%'}</div>
                    </Card>
                </div>
            )}

            {/* App menu */}
            <h2 className="mb-3 text-sm font-bold uppercase tracking-wide text-muted">Explore</h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {tiles.map((tile) => (
                    <Link key={tile.href} href={tile.href}>
                        <Card className="flex h-full items-center gap-4 p-5 transition-colors hover:border-pitch-300">
                            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-pitch-50 text-pitch-600">
                                <tile.icon size={20} />
                            </div>
                            <div>
                                <div className="text-sm font-bold text-ink">{tile.label}</div>
                                <div className="text-xs text-muted">{tile.desc}</div>
                            </div>
                        </Card>
                    </Link>
                ))}
            </div>
        </div>
    )
}
