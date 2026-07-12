'use client';

import { useCallback, useEffect, useState } from "react";
import { Button, Card, Chip, Skeleton } from "@heroui/react";
import { Pencil, Trash2, CalendarClock } from "lucide-react";

import { pickResulTitle, pickResultChipColor } from "@/utlis/pickResult";
import { formatDateTime } from "@/utlis/time/time";
import DialogComponent from "../tailwind/DialogComponent";
import DeleteForm from "./DeleteForm";
import MatchForm from "./MatchForm";
import { loadNoteDetail } from '@/service/notesService';
import { loadNote } from '@/utlis/storage/notes';
import Breadcrumb from "../common/Breadcumb/Breadcumb";

interface NotesDetailProps {
    id : string
}

const bilingual = (value: any) =>
    typeof value === 'object' && value !== null ? (value.en || value.id || '-') : (value || '-')

function NotesDetail ({
    id
} : NotesDetailProps) {

    const [ showDialog, setShowDialog ] = useState({
        action: '',
        isOpen: false
    })

    const [ note, setNote ] = useState<MatchNotes>()
    const [ loading, setLoading ] = useState(true)

    const loadDetail = useCallback(async () => {
        setLoading(true)
        const session = localStorage.getItem('mgm_access_token')
        if (session) {
            const data = await loadNoteDetail(id)
            if (data?.data) { setNote(data.data) }
        } else {
            const data = await loadNote(id)
            if (data) { setNote(data) }
        }
        setLoading(false)
    }, [id])

    useEffect(() => { loadDetail() }, [loadDetail])

    const canEdit = (() => {
        try {
            if (!localStorage.getItem('mgm_access_token')) { return true } // local notes are always editable
            const localUser = JSON.parse(localStorage.getItem('mgm_user') || '{}');
            // note.user can be a populated object or a plain ObjectId string
            const noteUser: any = note?.user
            const noteUserId = noteUser?.id || noteUser?._id || noteUser
            return Boolean(localUser?.id) && String(localUser.id) === String(noteUserId ?? '');
        } catch {
            return false;
        }
    })();

    return (
        <>
        <Breadcrumb
            items={[
            { label: 'Home', href: '/' },
            { label: 'Notes', href: '/notes' },
            { label: note?.title || note?.id || '-' }
            ]}
        />
        { loading &&
            <div className="grid gap-4">
                <Skeleton className="h-8 w-2/3" />
                <Skeleton className="h-24" />
                <Skeleton className="h-32" />
            </div>
        }
        { !loading && note && <div className="grid gap-4">
            {/* Header */}
            <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                    <h1 className="text-xl font-bold tracking-tight">{note.title}</h1>
                    <Chip color={pickResultChipColor(note)} size="sm">{pickResulTitle(note)}</Chip>
                </div>
                {canEdit && (
                    <div className="flex gap-2">
                        <Button variant="secondary" size="sm"
                            onPress={() => { setShowDialog({ action: 'edit', isOpen: true }) }}>
                            <Pencil size={13} />
                            Edit
                        </Button>
                        <Button variant="danger-soft" size="sm"
                            onPress={() => { setShowDialog({ action: 'delete', isOpen: true }) }}>
                            <Trash2 size={13} />
                            Delete
                        </Button>
                    </div>
                )}
            </div>

            <div className="text-xs text-faint">Posted {formatDateTime(note.createdDate)}</div>

            {/* Match info */}
            <Card className="grid gap-3 p-5 sm:grid-cols-3">
                <div>
                    <div className="text-[11px] uppercase tracking-wide text-muted">Pick</div>
                    <div className="text-sm font-bold">{note.pickType ? `${note.pickType} · ` : ''}{note.pick || '-'}</div>
                </div>
                <div>
                    <div className="text-[11px] uppercase tracking-wide text-muted">Confidence</div>
                    <div className="text-sm font-bold">{note.confidence}/10</div>
                </div>
                <div>
                    <div className="text-[11px] uppercase tracking-wide text-muted">Kick-off</div>
                    <div className="flex items-center gap-1.5 text-sm font-bold">
                        <CalendarClock size={14} className="text-muted" />
                        {formatDateTime(note.kickOffTime)}
                    </div>
                </div>
            </Card>

            {/* Analyst reason */}
            <Card className="space-y-2 p-5">
                <Card.Title className="text-sm font-bold">Analyst reason</Card.Title>
                {note.reason?.en && <p className="text-sm"><span className="font-medium text-muted">EN:</span> {note.reason.en}</p>}
                {note.reason?.id && <p className="text-sm"><span className="font-medium text-muted">ID:</span> {note.reason.id}</p>}
                {!note.reason?.en && !note.reason?.id && <p className="text-sm text-faint">-</p>}
            </Card>

            {/* Match result */}
            <Card className="space-y-2 p-5">
                <Card.Title className="text-sm font-bold">Match result</Card.Title>
                <p className="text-sm">{bilingual(note.result)}</p>
            </Card>

            {/* Reflection */}
            <Card className="space-y-2 p-5">
                <Card.Title className="text-sm font-bold">Reflection</Card.Title>
                <p className="text-sm">{bilingual(note.reflection)}</p>
            </Card>

            <DialogComponent open={showDialog.isOpen} setOpenDialog={() => { setShowDialog({
                action: '', isOpen: false
            }) }}>
                {
                    showDialog.action == 'edit' &&
                    <MatchForm data={note} onSaved={() => {
                        setShowDialog({ action: '', isOpen: false })
                        loadDetail()
                    }}/>
                }
                {
                    showDialog.action == 'delete' &&
                    <DeleteForm noteId={note.id || note._id || ''} closeDialog={() => { setShowDialog({
                        action: '', isOpen: false
                    }) }} callback={() => {window.location.replace('/notes')}}/>
                }
            </DialogComponent>
        </div>}
        { (!note && !loading) && <div className="mt-10 text-center text-sm text-muted">Note not found</div>}
        </>
    )
}

export default NotesDetail
