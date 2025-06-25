import moment from "moment";

const STORAGE_KEY = 'matchNotes';

export const saveNote = (data : any) => {
  if (process.env.NEXT_PUBLIC_STORAGE === 'local') {
    let currData = loadNotes()
    if (currData) { currData.push({
      ...data,
      _id: Date.now(),
      createdDate: new Date()
    }) } else { currData = [{
      ...data,
      _id: Date.now(),
      createdDate: new Date()
    }] }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(currData));
    window.location.reload()
  } else {
    // next version: send to backend API
  }
}

export const loadNotes = () => {
  let datas = localStorage.getItem(STORAGE_KEY)
  return datas ? JSON.parse(datas).sort((a: any,b: any) => {
    if (a.createdDate < b.createdDate) return 1;
    if (a.createdDate > b.createdDate) return -1;
    return 0;
  }) : null
}

export const loadNote = (_id: string) => {
  let datas = localStorage.getItem(STORAGE_KEY)
  return datas ? JSON.parse(datas).filter((v : any) => v._id == _id)[0] : null
}

export const deleteNoteLocal = (_id: string, callback?: any) => {
  let datas = localStorage.getItem(STORAGE_KEY)
  let newData = datas ? JSON.parse(datas).filter((note : any) => note._id !== _id) : []
  localStorage.setItem(STORAGE_KEY, JSON.stringify(newData));
  if (callback) { callback(); return;}
  window.location.reload()
}

export function updateNote(updatedNote: any) {
  const notes = loadNotes();
  const updated = notes.map((note: MatchNotes) =>
    note._id === updatedNote._id ? updatedNote : note
  );
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  window.location.reload()
}

export function clearStorage() {
  localStorage.removeItem(STORAGE_KEY);
}