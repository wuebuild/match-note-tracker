'use client';
import { useState } from "react";
import { Button } from "@heroui/react";
import { Trash2 } from "lucide-react";
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

    const [ isDeleting, setIsDeleting ] = useState(false)

    const deleteNotes = async () => {
        setIsDeleting(true)
        try {
            const session = localStorage.getItem('mgm_access_token')
            if (session) { await deleteNote(noteId, callback) }
            else { deleteNoteLocal(noteId, callback) }
        } finally {
            setIsDeleting(false)
        }
    }

    return (
        <div className="mx-auto flex max-w-sm flex-col items-center gap-3 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-red-50 text-lose">
                <Trash2 size={22} />
            </div>
            <div className="text-base font-bold">Delete this note?</div>
            <p className="text-sm text-muted">Your pick, reasoning, and reflection will be gone. This cannot be undone.</p>
            <div className="mt-3 flex justify-center gap-2">
                <Button variant="secondary" onPress={closeDialog}>Cancel</Button>
                <Button variant="danger" isDisabled={isDeleting} onPress={deleteNotes}>
                    {isDeleting ? 'Deleting…' : 'Delete note'}
                </Button>
            </div>
        </div>
    )
}

export default DeleteForm
