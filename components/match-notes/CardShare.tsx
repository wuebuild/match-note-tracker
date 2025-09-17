'use client'

import { useRef } from 'react'
import html2canvas from 'html2canvas'

function CardShareComponent ({note} : {note: MatchNotes}) {
    const cardRef = useRef<HTMLDivElement>(null)

    const handleDownload = async () => {
        if (!cardRef.current) return
        const canvas = await html2canvas(cardRef.current, {
        backgroundColor: '#ffffff',
        scale: 2,
        })
        const dataUrl = canvas.toDataURL('image/png')
        const link = document.createElement('a')
        link.href = dataUrl
        link.download = `match-note-${note.id}.png`
        link.click()
    }

    return (
        <div className="space-y-4">
        {/* Card preview (will be captured) */}
        <div
            ref={cardRef}
            className="w-[400px] p-6 rounded-2xl bg-white shadow-2xl border border-gray-200 text-black space-y-4 font-sans"
        >
            <h2 className="text-lg font-bold text-gray-800">{note.title}</h2>

            <div className="flex justify-between">
            <div>
                <p className="text-sm text-gray-500">Pick</p>
                <p className="font-semibold text-gray-700">{note.pick}</p>
            </div>
            <div>
                <p className="text-sm text-gray-500">Confidence</p>
                <p className="font-semibold text-gray-700">{note.confidence}</p>
            </div>
            </div>

            <div className="flex justify-between text-xs text-gray-400 border-t pt-4 border-dashed">
            <span>MatchJournal</span>
            <span>{note.result || 'Pending'}</span>
            </div>

            <div className="text-[10px] text-gray-400 text-right mt-2">
            matchjournal.wuebuild.com/notes/{note.id}
            </div>
        </div>

        {/* Download button */}
        <button
            onClick={handleDownload}
            className="px-4 py-2 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700"
        >
            Download as Image
        </button>
        </div>
    )
}

export default CardShareComponent