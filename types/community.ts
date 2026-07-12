interface LeaderboardRow {
    userId: string,
    name: string,
    points: number,
    picks: number,
    wins: number,
}

interface FeedNote {
    _id: string,
    title: string,
    pickTypeId?: number,
    pickType?: string,
    pick?: string,
    pickInfo?: string,
    pickResult?: string | null,
    confidence?: number,
    kickOffTime: string,
    reason?: { en: string, id: string },
    result?: { en: string, id: string },
    reflection?: { en: string, id: string },
    pointsAwarded?: number,
    settledDate?: string | null,
    createdDate: string,
    locked: boolean,
    user: { _id: string, name: string } | null,
}

interface AnalystProfile {
    analyst: {
        _id: string,
        name: string,
        bio: string,
        feedPrivacy: 'public' | 'private' | 'supporters',
        favouriteTeams: { _id: string, name: string, logo?: string }[],
        joinedDate: string,
    },
    stats: {
        points: number,
        picks: number,
        wins: number,
        winRate: number | null,
    },
    followers: number,
    isFollowing: boolean,
    isSupporter: boolean,
    canViewNotes: boolean,
    recentNotes: FeedNote[],
}

interface MyProfile {
    id: string,
    _id: string,
    name: string,
    email: string,
    bio?: string,
    feedPrivacy: 'public' | 'private' | 'supporters',
    favouriteTeams: { _id: string, name: string, logo?: string }[],
}
