'use client';
import { deleteNote } from "@/service/notesService"
import { deleteNoteLocal } from "@/utlis/storage/notes";

interface DeleteFormProps {
    noteId: string,
    closeDialog?: any,
    callback?: any
}

function DeleteForm ({
    noteId, closeDialog, callback
} : DeleteFormProps) {

    const deleteNotes = async () => {
        const session = localStorage.getItem('mgm_access_token')
        if (session) { await deleteNote(Number(noteId), callback) }
        else { 
            // delete locally
            deleteNoteLocal(noteId, callback)
        }
    }

    return (
        // <div className="p-6 bg-white rounded-xl shadow-lg text-center flex flex-col gap-4 max-w-sm mx-auto">
        <div className="text-center flex flex-col gap-4 max-w-sm mx-auto">
            <div className="text-lg font-bold text-red-600">Are you sure?</div>
            <div className="text-sm text-gray-500">This action <span className="font-semibold">cannot be undone</span>.</div>
            <div className="flex justify-center gap-4 mt-4">
                <button
                    onClick={closeDialog}
                    className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 text-sm font-medium"
                    >
                Cancel
                </button>
                <button
                    onClick={deleteNotes}
                    className="px-4 py-2 rounded bg-red-400 text-white hover:bg-red-600 text-sm font-bold"
                    >
                Delete
                </button>
            </div>
        </div>
    )
}

export default DeleteForm