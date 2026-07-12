'use client'
import { useEffect, useState } from "react";
import Link from "next/link";
import { Card, Chip, Skeleton } from "@heroui/react";
import { Trophy } from "lucide-react";
import { loadLeaderboard } from "@/service/communityService";

const PERIODS = [
    { key: 'weekly', label: 'This week' },
    { key: 'monthly', label: 'This month' },
    { key: 'all', label: 'All time' },
] as const

const medal = (rank: number) =>
    rank === 0 ? '🥇' : rank === 1 ? '🥈' : rank === 2 ? '🥉' : null

export default function Leaderboard() {

    const [ period, setPeriod ] = useState<'weekly' | 'monthly' | 'all'>('weekly')
    const [ rows, setRows ] = useState<LeaderboardRow[]>([])
    const [ isLoading, setIsLoading ] = useState(true)

    useEffect(() => {
        let cancelled = false
        setIsLoading(true)
        loadLeaderboard(period).then((data) => {
            if (!cancelled) { setRows(data); setIsLoading(false) }
        }).catch(() => { if (!cancelled) { setRows([]); setIsLoading(false) } })
        return () => { cancelled = true }
    }, [period])

    return (
        <div className="mx-auto min-h-screen w-full max-w-3xl px-4 py-8 sm:px-6">
            <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">Leaderboard</h1>
                    <p className="text-sm text-muted">Points for correct pre-kickoff calls. No luck, just reading the game.</p>
                </div>
                <div className="flex gap-1 rounded-xl border border-line bg-white p-1">
                    {PERIODS.map(p => (
                        <button
                            key={p.key}
                            className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors ${period === p.key ? 'bg-pitch-700 text-white' : 'text-muted hover:bg-pitch-50'}`}
                            onClick={() => setPeriod(p.key)}
                        >
                            {p.label}
                        </button>
                    ))}
                </div>
            </div>

            {isLoading &&
                <div className="flex flex-col gap-2">
                    {[...Array(5)].map((_, i) => <Skeleton key={i} className="h-16 rounded-2xl" />)}
                </div>
            }

            {!isLoading && rows.length === 0 &&
                <Card className="flex flex-col items-center gap-3 p-10 text-center">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-pitch-50 text-pitch-600">
                        <Trophy size={22} />
                    </div>
                    <div className="text-base font-bold">No settled picks {period !== 'all' ? 'in this period' : 'yet'}</div>
                    <p className="text-sm text-muted">Points appear once predictions are settled after full-time.</p>
                </Card>
            }

            <div className="flex flex-col gap-2">
                {rows.map((row, index) => {
                    const winRate = row.picks ? Math.round((row.wins / row.picks) * 100) : 0
                    return (
                        <Card key={row.userId} className={`flex flex-row items-center gap-4 p-4 ${index < 3 ? 'border-pitch-200 bg-pitch-50/40' : ''}`}>
                            <div className="w-8 text-center text-lg font-bold text-muted">
                                {medal(index) || index + 1}
                            </div>
                            <div className="min-w-0 flex-1">
                                <Link href={`/analyst/${row.userId}`} className="truncate text-sm font-bold text-ink hover:text-pitch-600">
                                    {row.name}
                                </Link>
                                <div className="text-xs text-muted">{row.wins}/{row.picks} correct · {winRate}% win rate</div>
                            </div>
                            <Chip color="accent" size="sm">{row.points} pts</Chip>
                        </Card>
                    )
                })}
            </div>
        </div>
    )
}
