interface MatchNotes {
    id: string | null,
    title: string,
    // pick Type
    pickTypeId: string,
    pickType: string,
    // pick
    pick: string,
    pickInfo: string,
    // confidence
    confidence: number,
    // reason
    reason: {
        id: string,
        en: string,
        idn: string,
    },
    kickOffTime: Date,
    // pickResult
    pickResult: string | null,
    // result
    result: string,
    // reflection
    reflection: string,
    user: User | null,
    createdDate: Date | null,
    isSynced: boolean | null,
    _id: string | null
}