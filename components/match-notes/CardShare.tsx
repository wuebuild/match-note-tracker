'use client'

import { useRef, useState } from 'react'
import { Button } from '@heroui/react'
import { Download } from 'lucide-react'
import { formatDate } from '@/utlis/time/time'

function CardShareComponent ({note} : {note: MatchNotes}) {
    const cardRef = useRef<HTMLDivElement>(null)
    const [ isExporting, setIsExporting ] = useState(false)

    const handleDownload = async () => {
        if (!cardRef.current) return
        setIsExporting(true)
        try {
            // keep html2canvas out of the initial bundle
            const html2canvas = (await import('html2canvas')).default
            const canvas = await html2canvas(cardRef.current, {
                backgroundColor: '#ffffff',
                scale: 2,
            })
            const dataUrl = canvas.toDataURL('image/png')
            const link = document.createElement('a')
            link.href = dataUrl
            link.download = `match-note-${note.id || note._id}.png`
            link.click()
        } finally {
            setIsExporting(false)
        }
    }

    return (
        <div className="flex flex-col items-center gap-4">
            {/* Card preview (will be captured) */}
            <div
                ref={cardRef}
                className="w-full max-w-[400px] space-y-4 rounded-2xl border border-gray-200 bg-white p-6 font-sans text-black"
            >
                <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold uppercase tracking-widest text-green-700">Match Note</span>
                    <span className="text-[11px] text-gray-400">{formatDate(note.kickOffTime)}</span>
                </div>
                <h2 className="text-lg font-bold text-gray-900">{note.title}</h2>

                <div className="flex justify-between gap-4">
                    <div>
                        <p className="text-xs text-gray-500">Pick</p>
                        <p className="font-semibold text-gray-800">{note.pick || '-'}</p>
                    </div>
                    <div className="text-right">
                        <p className="text-xs text-gray-500">Confidence</p>
                        <p className="font-semibold text-gray-800">{note.confidence}/10</p>
                    </div>
                </div>

                <div className="flex justify-between border-t border-dashed border-gray-200 pt-4 text-xs text-gray-400">
                    <span>Match Note Maker</span>
                    <span>{note.result ? String(note.result) : 'Pending'}</span>
                </div>

                <div className="text-right text-[10px] text-gray-400">
                    matchjournal.wuebuild.com/notes/{note.id || note._id}
                </div>
            </div>

            <Button isDisabled={isExporting} onPress={handleDownload}>
                <Download size={16} />
                {isExporting ? 'Preparing…' : 'Download as image'}
            </Button>
        </div>
    )
}

export default CardShareComponent
