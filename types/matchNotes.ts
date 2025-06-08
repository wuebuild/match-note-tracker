interface MatchNotes {
    _id: string | null,
    title: string,
    pickType: string,
    pick: string,
    confidence: number,
    reason: {
        en: string,
        id: string
    },
    kickOffTime: Date,
    pickResult: string | null,
    result: string,
    reflection: string,
    user: User | null,
    createdDate: Date | null
}