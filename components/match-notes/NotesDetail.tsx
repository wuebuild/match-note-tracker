'use client';

import { pickResultColor, pickResulTitle } from "@/utlis/pickResult";
import moment from "moment";
import { useEffect } from "react";

interface NotesDetailProps {
    note : MatchNotes
}

function NotesDetail ({
    note
} : NotesDetailProps) {

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
        <div className="grid gap-4">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="text-xl font-bold text-gray-800">{note.title}</div>
                {canEdit && (
                    <button
                    className="text-sm bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-1 px-3 rounded shadow"
                    onClick={() => {
                        // your edit logic here
                    }}
                    >
                    ✏️ Edit
                    </button>
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
        </div>
    )
}

export default NotesDetail