import { client } from "@/utlis/axios";
import { loadNotes } from "@/utlis/storage/notes";

export async function loadListNotes () {
    const res = await client.get('/notes/list')
    return res.data.data
}

export async function loadNoteDetail (noteId: string) {
    const res = await client.get(`/notes/detail?noteId=${noteId}`)
    return res.data
}

export async function createNotes (notes: any, callback?:any) {
    let { pick, pickType, user, id, _id, isSynced, ...newNotes } = notes
    const res = await client.post('/notes/create', {
        ...newNotes,
        pick,
        pickType,
        confidence: Number(notes.confidence || 1),
        result: typeof notes.result != "object" ? notes.result ? { en: notes.result, id: ''} : '' : notes.result,
        reflection: typeof notes.reflection != "object" ? notes.reflection ? { en: notes.reflection, id: ''} : '' : notes.reflection
    })
    if (callback) { callback(); return; }
    window.location.reload()
    return res.data
}

export async function updateNotes (notes: any, callback?:any) {
    let { _id, id, user, isSynced, ...newNotes } = notes
    const res = await client.patch('/notes/update', {
        ...newNotes,
        noteId: id || _id,
        confidence: Number(notes.confidence || 1),
        result: typeof notes.result != "object" ? notes.result ? { en: notes.result, id: ''} : '' : notes.result,
        reflection: typeof notes.reflection != "object" ? notes.reflection ? { en: notes.reflection, id: ''} : '' : notes.reflection
    })
    if (callback) { callback(); return; }
    window.location.reload()
    return res.data
}


export async function deleteNote (noteId: string, callback?: any) {
    const res = await client.delete(`/notes/delete?noteId=${noteId}`)
    if (callback) { callback(); return;}
    window.location.reload()
    return res.data
}

export async function syncNotes () {
    const notes = await loadNotes() || []
    let newNotesList = []
    for (let i = 0; i < notes.length; i ++) {
        let { pick, pickType, _id, user, isSynced, ...newNotes } = notes[i]
        const res = await client.post('/notes/create', {
            ...newNotes,
            pick,
            pickType,
            confidence: Number(notes[i].confidence || 1),
            pickTypeId: notes[i].pickTypeId ? notes[i].pickTypeId : 1,
            result: typeof notes[i].result != "object" ? notes[i].result ? { en: notes[i].result, id: ''} : '' : notes[i].result || null,
            reflection: typeof notes[i].reflection != "object" ? notes[i].reflection ? { en: notes[i].reflection, id: ''} : '' : notes[i].reflection || null
        })
        if (!res.data || res.data.error) {
            newNotesList.push({
                ...notes[i],
                isSynced: false
            })
        }
    }
    localStorage.setItem('matchNotes', JSON.stringify(newNotesList));
}
