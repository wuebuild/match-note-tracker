export const pickResultColor = (note : MatchNotes) => {
    if (!note) { return 'gray' }
    if (!note.pickResult) { return 'gray' }
    return (note.pickResult.toLowerCase() === 'right' || note.pickResult.toLowerCase() === 'true') ? 'bg-accent' : note.pickResult.toLowerCase() === 'false' ? 'bg-red-500' : 'bg-gray-800'
}

/** HeroUI Chip color for a note's pick result */
export const pickResultChipColor = (note : MatchNotes) : 'success' | 'danger' | 'default' => {
    if (!note || !note.pickResult) { return 'default' }
    const value = note.pickResult.toLowerCase()
    return (value === 'right' || value === 'true') ? 'success' : value === 'false' ? 'danger' : 'default'
}

export const pickResulTitle = (note : MatchNotes) => {
    if (!note) { return 'TBD' }
    if (!note.pickResult) { return 'TBD' }
    return (note.pickResult.toLowerCase() === 'right' || note.pickResult.toLowerCase() === 'true') ? 'WIN' : note.pickResult.toLowerCase() === 'false' ? 'LOSE' : 'TBD'
}