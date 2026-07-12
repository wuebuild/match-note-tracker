import { client } from "@/utlis/axios";

export async function loadLeaderboard (period: 'weekly' | 'monthly' | 'all' = 'all') {
    const res = await client.get(`/leaderboard?period=${period}`)
    return (res.data?.data || []) as LeaderboardRow[]
}

export async function loadFeed (filter: 'all' | 'following' | 'teams' = 'all', page = 0) {
    const res = await client.get(`/feed?filter=${filter}&page=${page}`)
    return (res.data?.data || []) as FeedNote[]
}

export async function loadAnalyst (userId: string) {
    const res = await client.get(`/analyst/detail?userId=${userId}`)
    return (res.data?.data || null) as AnalystProfile | null
}

export async function followAnalyst (analystId: string) {
    const res = await client.post('/analyst/follow', { analystId })
    return !res.data?.error
}

export async function unfollowAnalyst (analystId: string) {
    const res = await client.post('/analyst/unfollow', { analystId })
    return !res.data?.error
}

export async function subscribeToAnalyst (analystId: string) {
    const res = await client.post('/membership/subscribe', { analystId })
    return !res.data?.error
}
