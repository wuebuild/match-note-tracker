import { client } from "@/utlis/axios";
import { loadNotes, updateNote } from "@/utlis/storage/notes";

export async function loadListNotes () {
    const res = await client.get('/notes/list')
    return res.data.data
}

export async function loadUserNotes () {

}

export async function loadNoteDetail (noteId: number) {
    const res = await client.get(`/notes/detail?noteId=${noteId}`)
    return res.data
}

export async function createNotes (notes: any) {
    let { pick, pickType, user, id, _id, isSynced, ...newNotes } = notes
    const res = await client.post('/notes/create', {
        ...newNotes,
        confidence: Number(notes.confidence || 1),
        result: typeof notes.result != "object" ? notes.result ? { en: notes.result, id: ''} : '' : notes.result,
        reflection: typeof notes.reflection != "object" ? notes.reflection ? { en: notes.reflection, id: ''} : '' : notes.reflection
    })
    return res.data
}

export async function updateNotes (notes: any) {
    let { _id, pick, pickType, user, isSynced, ...newNotes } = notes
    const res = await client.patch('/notes/update', {
        ...newNotes,
        confidence: Number(notes.confidence || 1),
        result: typeof notes.result != "object" ? notes.result ? { en: notes.result, id: ''} : '' : notes.result,
        reflection: typeof notes.reflection != "object" ? notes.reflection ? { en: notes.reflection, id: ''} : '' : notes.reflection
    })
    return res.data
}


export async function deleteNote (noteId: number, callback?: any) {
    const res = await client.delete(`/notes/delete?noteId=${noteId}`)
    if (callback) { callback(); return;}
    window.location.reload()
    return res.data
}

export async function syncNotes () {
    console.log('here syncNotes')
    const notes = await loadNotes() || []
    let newNotesList = []
    console.log('here notes', notes)
    for (let i = 0; i < notes.length; i ++) {
        let { pick, pickType, _id, user, isSynced, ...newNotes } = notes[i]
        console.log('here note', notes[i])
        const res = await client.post('/notes/create', {
            ...newNotes,
            confidence: Number(notes[i].confidence || 1),
            pickTypeId: notes[i].pickTypeId ? notes[i].pickTypeId : 1,
            result: typeof notes[i].result != "object" ? notes[i].result ? { en: notes[i].result, id: ''} : '' : notes[i].result || null,
            reflection: typeof notes[i].reflection != "object" ? notes[i].reflection ? { en: notes[i].reflection, id: ''} : '' : notes[i].reflection || null
        })
        if (!res.data) {
            newNotesList.push({
                ...notes[i],
                isSynced: false
            })
        }
    }
    localStorage.setItem('matchNotes', JSON.stringify(newNotesList));
}