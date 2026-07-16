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
    _id: string | null,
    // optional link to a real fixture (string id when writing, populated object when reading)
    fixture?: string | Fixture | null,
    // client-only label for a freshly linked fixture (e.g. "Arsenal vs Chelsea")
    fixtureLabel?: string | null,
}