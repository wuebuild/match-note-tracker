export const pickResultColor = (note : MatchNotes) => {
    if (!note) { return 'gray' }
    if (!note.pickResult) { return 'gray' }
    return (note.pickResult.toLowerCase() === 'right' || note.pickResult.toLowerCase() === 'true') ? 'bg-accent' : note.pickResult.toLowerCase() === 'false' ? 'bg-red-500' : 'bg-gray-800'
}

export const pickResulTitle = (note : MatchNotes) => {
    if (!note) { return 'TBD' }
    if (!note.pickResult) { return 'TBD' }
    return (note.pickResult.toLowerCase() === 'right' || note.pickResult.toLowerCase() === 'true') ? 'WIN' : note.pickResult.toLowerCase() === 'false' ? 'LOSE' : 'TBD'
}