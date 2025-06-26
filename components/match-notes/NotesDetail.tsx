'use client';

import moment from "moment";
import { useEffect, useState } from "react";
import { pickResultColor, pickResulTitle } from "@/utlis/pickResult";
import DialogComponent from "../tailwind/DialogComponent";
import DeleteForm from "./DeleteForm";
import MatchForm from "./MatchForm";
import { loadNoteDetail } from '@/service/notesService';
import { loadNote } from '@/utlis/storage/notes';
import Breadcrumb from "../common/Breadcumb/Breadcumb";

interface NotesDetailProps {
    id : string
}

function NotesDetail ({
    id
} : NotesDetailProps) {

    const [ showDialog, setShowDialog ] = useState({
        action: '',
        isOpen: false
    })

    const [ note, setNote ] = useState<MatchNotes>()
    const [ loading, setLoading ] = useState(true)

    useEffect(() => {
        const session = localStorage.getItem('mgm_access_token')
        if (session) {
        loadNotesDetailFromServer()
        } else {
        loadNotesDetailFromLocal()
        }
    }, [])

    const loadNotesDetailFromServer = async () => {
        setLoading(true)
        const data = await loadNoteDetail(Number(id))
        if (data.data) { setNote(data.data) }
        setLoading(false)
    }

    const loadNotesDetailFromLocal = async () => {
        const data = await loadNote(id)
        console.log('here data', data)
        setNote(data)
    }

    useEffect(() => {
    }, [note])

    const canEdit = (() => {
        try {
            const localUser = JSON.parse(localStorage.getItem('mgm_user') || '{}');
            return localUser?.id === note?.user?.id;
        } catch (e) {
            console.error('Failed to parse user:', e);
            return false;
        }
    })();

    return (
        <>
        <Breadcrumb
            items={[
            { label: 'Home', href: '/' },
            { label: 'Notes', href: '/notes' },
            { label: note?.title || note?.id || '-' } // current page, no link
            ]}
        />
        { note && <div className="grid gap-4">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="text-xl font-bold text-gray-800">{note.title}</div>
                {canEdit && (
                    <div className="flex gap-2">
                        <button
                            className="bg-yellow-400 text-white px-4 py-2 rounded hover:bg-yellow-500 text-[12px] font-bold"
                            onClick={() => {
                                // your edit logic here
                                setShowDialog({
                                    action: 'edit',
                                    isOpen: true
                                })
                            }}
                            >Edit</button>
                        <button
                            className="bg-red-400 text-white px-4 py-2 rounded hover:bg-red-500 text-[12px] font-bold"
                            onClick={() => {
                                // your edit logic here
                                setShowDialog({
                                    action: 'delete',
                                    isOpen: true
                                })
                            }}
                            >Delete</button>
                    </div>
                )}
            </div>

            <div className="text-xs text-gray-500">
                Posted: {moment(note.createdDate).format('YYYY-MM-DD HH:mm')}
            </div>

            {/* Match Info Section */}
            <div className="bg-gray-50 p-4 rounded-lg shadow-sm grid grid-cols-1 md:grid-cols-2 gap-1 items-center relative">
                <div className="space-y-1 text-sm text-gray-700">
                    <div><span className="font-semibold">Confidence:</span> {note.confidence}/10</div>
                    {
                        note.pickResult != null &&
                        <div className={`absolute right-[-10px] top-[-10px] rotate-[8deg] px-3 py-1 text-white text-[11px] font-bold rounded-sm shadow ${pickResultColor(note)}`}>
                        {pickResulTitle(note)}
                        </div>
                    }
                </div>
                <div className="md:text-right text-sm text-gray-600">
                    <span className="font-semibold">Kick Off:</span><br />
                    {moment(note.kickOffTime).format('YYYY-MM-DD HH:mm')} UTC
                </div>
            </div>

            {/* Analyst Reason */}
            <div className="bg-white p-4 rounded-lg border space-y-2">
                <div className="font-semibold text-sm text-gray-800">Analyst Reason</div>
                <div className="text-sm"><span className="text-gray-600 font-medium">EN:</span> {note.reason.en}</div>
                <div className="text-sm"><span className="text-gray-600 font-medium">ID:</span> {note.reason.id}</div>
            </div>

            {/* Match Result */}
            <div className="bg-white p-4 rounded-lg border space-y-2">
                <div className="font-semibold text-sm text-gray-800">Match Result</div>
                <div className="text-sm">{note.result || '-'}</div>
            </div>

            {/* Reflection */}
            <div className="bg-white p-4 rounded-lg border space-y-2">
                <div className="font-semibold text-sm text-gray-800">Reflection</div>
                <div className="text-sm">{note.reflection || '-'}</div>
            </div>
            <DialogComponent open={showDialog.isOpen} setOpenDialog={() => { setShowDialog({
                action: '', isOpen: false
            }) }}>
                {
                    showDialog.action == 'edit' && 
                    <MatchForm data={note}/>
                }
                {
                    showDialog.action == 'delete' && 
                    <DeleteForm noteId={note.id || note._id || ''} closeDialog={() => { setShowDialog({
                        action: '', isOpen: false
                    }) }} callback={() => {window.location.replace('/notes')}}/>
                }
            </DialogComponent>
        </div>}
        { (!id && !loading) && <div>Not Found</div>}
        </>
    )
}

export default NotesDetail