'use client'
import { use, useCallback, useEffect, useState } from "react";
import { Button, Card, Chip, Skeleton } from "@heroui/react";
import { UserPlus, UserMinus, Star, Lock } from "lucide-react";
import { toast } from "react-toastify";
import FeedCard from "@/components/feed/FeedCard";
import { loadAnalyst, followAnalyst, unfollowAnalyst, subscribeToAnalyst } from "@/service/communityService";

export default function AnalystPage(props: { params: Promise<{ id: string }> }) {
    const { id } = use(props.params);

    const [ profile, setProfile ] = useState<AnalystProfile | null>(null)
    const [ isLoading, setIsLoading ] = useState(true)
    const [ session, setSession ] = useState<string | null>(null)
    const [ myId, setMyId ] = useState<string | null>(null)

    useEffect(() => {
        setSession(localStorage.getItem('mgm_access_token'))
        try { setMyId(JSON.parse(localStorage.getItem('mgm_user') || '{}')?.id || null) } catch {}
    }, [])

    const loadProfile = useCallback(async () => {
        const data = await loadAnalyst(id)
        setProfile(data)
        setIsLoading(false)
    }, [id])

    useEffect(() => { loadProfile() }, [loadProfile])

    const isSelf = Boolean(myId && profile && String(myId) === String(profile.analyst._id))

    const toggleFollow = async () => {
        if (!profile) { return }
        const ok = profile.isFollowing
            ? await unfollowAnalyst(profile.analyst._id)
            : await followAnalyst(profile.analyst._id)
        if (ok) { loadProfile() } else { toast.error('Something went wrong') }
    }

    const support = async () => {
        if (!profile) { return }
        const result = await subscribeToAnalyst(profile.analyst._id)
        if (!result) { toast.error('Could not subscribe'); return }
        if (result.paymentUrl) {
            // Midtrans Snap hosted page; membership activates via webhook after payment
            window.open(result.paymentUrl, '_blank', 'noopener')
            toast.info('Complete the payment to activate your support')
            return
        }
        toast.success(`You now support ${profile.analyst.name}`)
        loadProfile()
    }

    if (isLoading) {
        return (
            <div className="mx-auto min-h-screen w-full max-w-5xl px-4 py-8 sm:px-6">
                <Skeleton className="h-24 rounded-2xl" />
                <div className="mt-4 grid grid-cols-3 gap-3">
                    {[...Array(3)].map((_, i) => <Skeleton key={i} className="h-20 rounded-2xl" />)}
                </div>
            </div>
        )
    }

    if (!profile) {
        return <div className="mt-16 text-center text-sm text-muted">Analyst not found</div>
    }

    const { analyst, stats } = profile

    return (
        <div className="mx-auto min-h-screen w-full max-w-5xl px-4 py-8 sm:px-6">
            {/* Header */}
            <Card className="flex flex-row flex-wrap items-center justify-between gap-4 p-6">
                <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                        <h1 className="text-2xl font-bold tracking-tight">{analyst.name}</h1>
                        {analyst.feedPrivacy !== 'public' &&
                            <Chip size="sm" color="default">
                                {analyst.feedPrivacy === 'supporters' ? 'Supporters-only feed' : 'Private feed'}
                            </Chip>
                        }
                    </div>
                    <div className="mt-1 text-sm text-muted">
                        {profile.followers} follower{profile.followers === 1 ? '' : 's'}
                        {analyst.bio ? ` · ${analyst.bio}` : ''}
                    </div>
                    {analyst.favouriteTeams.length > 0 &&
                        <div className="mt-2 flex flex-wrap gap-1.5">
                            {analyst.favouriteTeams.map(team => (
                                <Chip key={team._id} size="sm" color="accent" variant="soft">{team.name}</Chip>
                            ))}
                        </div>
                    }
                </div>
                {session && !isSelf &&
                    <div className="flex gap-2">
                        <Button variant={profile.isFollowing ? 'secondary' : 'primary'} size="sm" onPress={toggleFollow}>
                            {profile.isFollowing ? <UserMinus size={14} /> : <UserPlus size={14} />}
                            {profile.isFollowing ? 'Unfollow' : 'Follow'}
                        </Button>
                        {analyst.feedPrivacy === 'supporters' && !profile.isSupporter &&
                            <Button size="sm" onPress={support}>
                                <Star size={14} />
                                Become a supporter
                            </Button>
                        }
                    </div>
                }
            </Card>

            {/* Stats */}
            <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
                <Card className="px-4 py-3">
                    <div className="text-[11px] uppercase tracking-wide text-muted">Points</div>
                    <div className="text-xl font-bold text-pitch-700">{stats.points}</div>
                </Card>
                <Card className="px-4 py-3">
                    <div className="text-[11px] uppercase tracking-wide text-muted">Settled picks</div>
                    <div className="text-xl font-bold">{stats.picks}</div>
                </Card>
                <Card className="px-4 py-3">
                    <div className="text-[11px] uppercase tracking-wide text-muted">Correct</div>
                    <div className="text-xl font-bold text-win">{stats.wins}</div>
                </Card>
                <Card className="px-4 py-3">
                    <div className="text-[11px] uppercase tracking-wide text-muted">Win rate</div>
                    <div className="text-xl font-bold">{stats.winRate != null ? `${stats.winRate}%` : '—'}</div>
                </Card>
            </div>

            {/* Notes */}
            <h2 className="mb-3 mt-8 text-lg font-bold">Recent notes</h2>
            {!profile.canViewNotes ? (
                <Card className="flex flex-col items-center gap-3 p-10 text-center">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-pitch-50 text-pitch-600">
                        <Lock size={22} />
                    </div>
                    <div className="text-base font-bold">
                        {analyst.feedPrivacy === 'supporters' ? 'Supporters-only analysis' : 'This feed is private'}
                    </div>
                    <p className="max-w-sm text-sm text-muted">
                        {analyst.feedPrivacy === 'supporters'
                            ? `Support ${analyst.name} to unlock their full analysis feed.`
                            : `${analyst.name} keeps their match notes private.`}
                    </p>
                    {session && analyst.feedPrivacy === 'supporters' && !isSelf &&
                        <Button className="mt-1" onPress={support}>
                            <Star size={14} />
                            Become a supporter
                        </Button>
                    }
                </Card>
            ) : profile.recentNotes.length === 0 ? (
                <Card className="p-8 text-center text-sm text-muted">No notes yet.</Card>
            ) : (
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {profile.recentNotes.map(note => <FeedCard key={note._id} note={note} />)}
                </div>
            )}
        </div>
    )
}
