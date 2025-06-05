interface MatchNotes {
    _id: string | null,
    title: string,
    pick: string,
    confidence: number,
    reason: {
        en: string,
        id: string
    },
    kickOffTime: Date,
    result: string,
    user: User | null,
    createdDate: Date | null
}