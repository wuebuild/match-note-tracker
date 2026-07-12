'use client'
import { useEffect, useState } from "react";
import { Button, Card, Skeleton } from "@heroui/react";
import { Newspaper } from "lucide-react";
import FeedCard from "@/components/feed/FeedCard";
import { loadFeed } from "@/service/communityService";

type FeedFilter = 'all' | 'following' | 'teams'

const FILTERS: { key: FeedFilter, label: string, needsAuth: boolean }[] = [
    { key: 'all', label: 'All analysts', needsAuth: false },
    { key: 'following', label: 'Following', needsAuth: true },
    { key: 'teams', label: 'My teams', needsAuth: true },
]

export default function Feed() {

    const [ filter, setFilter ] = useState<FeedFilter>('all')
    const [ notes, setNotes ] = useState<FeedNote[]>([])
    const [ page, setPage ] = useState(0)
    const [ hasMore, setHasMore ] = useState(false)
    const [ isLoading, setIsLoading ] = useState(true)
    const [ session, setSession ] = useState<string | null>(null)

    useEffect(() => {
        setSession(localStorage.getItem('mgm_access_token'))
    }, [])

    useEffect(() => {
        let cancelled = false
        setIsLoading(true)
        loadFeed(filter, 0).then((data) => {
            if (cancelled) { return }
            setNotes(data)
            setPage(0)
            setHasMore(data.length === 20)
            setIsLoading(false)
        }).catch(() => { if (!cancelled) { setNotes([]); setIsLoading(false) } })
        return () => { cancelled = true }
    }, [filter])

    const loadMore = async () => {
        const next = page + 1
        const data = await loadFeed(filter, next)
        setNotes(prev => [...prev, ...data])
        setPage(next)
        setHasMore(data.length === 20)
    }

    return (
        <div className="mx-auto min-h-screen w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
            <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">Community Feed</h1>
                    <p className="text-sm text-muted">What the community is calling — picks unlock at kickoff.</p>
                </div>
                <div className="flex gap-1 rounded-xl border border-line bg-white p-1">
                    {FILTERS.filter(f => !f.needsAuth || session).map(f => (
                        <button
                            key={f.key}
                            className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors ${filter === f.key ? 'bg-pitch-700 text-white' : 'text-muted hover:bg-pitch-50'}`}
                            onClick={() => setFilter(f.key)}
                        >
                            {f.label}
                        </button>
                    ))}
                </div>
            </div>

            {isLoading &&
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {[...Array(6)].map((_, i) => (
                        <Card key={i} className="flex flex-col gap-3 p-5">
                            <Skeleton className="h-5 w-3/4" />
                            <Skeleton className="h-3 w-1/2" />
                            <Skeleton className="h-24" />
                        </Card>
                    ))}
                </div>
            }

            {!isLoading && notes.length === 0 &&
                <Card className="mx-auto mt-10 flex w-full max-w-md flex-col items-center gap-3 p-10 text-center">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-pitch-50 text-pitch-600">
                        <Newspaper size={22} />
                    </div>
                    <div className="text-base font-bold">
                        {filter === 'following' ? "You aren't following anyone yet"
                            : filter === 'teams' ? 'No notes for your favourite teams yet'
                            : 'The feed is quiet'}
                    </div>
                    <p className="text-sm text-muted">
                        {filter === 'following' ? 'Follow analysts from the leaderboard or their profile.'
                            : filter === 'teams' ? 'Pick favourite clubs on the Teams page to filter the feed.'
                            : 'Public match notes from every analyst appear here.'}
                    </p>
                </Card>
            }

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                {notes.map((note) => <FeedCard key={note._id} note={note} />)}
            </div>

            {hasMore && !isLoading &&
                <div className="mt-8 text-center">
                    <Button variant="secondary" onPress={loadMore}>Load more</Button>
                </div>
            }
        </div>
    )
}
