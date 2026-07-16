interface Fixture {
    _id: string,
    homeName: string,
    awayName: string,
    leagueName?: string,
    schedule: string,
    status?: string,
    goalsHome?: number | null,
    goalsAway?: number | null,
    logo?: string,
}
