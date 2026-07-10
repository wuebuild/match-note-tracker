'use client';
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button, Card, Chip, Tooltip } from "@heroui/react";
import { Share2, Copy, Pencil, Trash2, CalendarClock } from "lucide-react";
import { toast } from "react-toastify";

import { timeConverter, formatDate, formatDateTime } from "@/utlis/time/time";
import { pickResulTitle, pickResultChipColor } from "@/utlis/pickResult";
import DialogComponent from "../tailwind/DialogComponent";
import DeleteForm from "./DeleteForm";
import CardShareComponent from "./CardShare";

function MatchCard (props: MatchCardProps) {
    const { info, onClick, onChanged } = props

    let generatedPost = `📋 Match: ${info.title}\n`
    generatedPost += `🎯 Pick: ${info.pick}\n`
    generatedPost += `🔢 Confidence: ${info.confidence}/10\n`
    generatedPost += `🧠 Reason:\n`
    generatedPost += `EN: ${info.reason.en || '-'}\n`
    generatedPost += `ID: ${info.reason.id || '-'}\n\n\n`
    generatedPost += `🕐 Kickoff: ${formatDate(info.kickOffTime)} ${timeConverter(info.kickOffTime)} UTC\n`
    generatedPost += `📌 Result: ${info.result || 'TBD'}\n`
    generatedPost += `🔁 Reflection: ${info.reflection || '-'}\n`

    const [ openDialog, setOpenDialog ] = useState({ isOpen: false, type: '' })
    const router = useRouter();
    const confidence = Math.min(Math.max(Number(info.confidence) || 0, 0), 10)

    return (
        <Card className="flex h-full flex-col p-5">
            <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                    <Card.Title
                        className="cursor-pointer truncate text-base font-bold hover:text-pitch-600"
                        onClick={() => { router.push(`/notes/${info.id || info._id}`) }}
                    >
                        {info.title}
                    </Card.Title>
                    <div className="mt-0.5 text-[11px] text-faint">posted {formatDateTime(info.createdDate)}</div>
                </div>
                <Chip color={pickResultChipColor(info)} size="sm">{pickResulTitle(info)}</Chip>
            </div>

            <div className="mt-3 flex items-center gap-1.5 text-xs text-muted">
                <CalendarClock size={14} className="shrink-0" />
                {formatDate(info.kickOffTime)} · {timeConverter(info.kickOffTime)} UTC
            </div>

            <div className="mt-4 grid grid-cols-2 gap-3">
                <div className="rounded-lg bg-pitch-50/60 px-3 py-2">
                    <div className="text-[11px] text-muted">Pick</div>
                    <div className="truncate text-sm font-bold text-foreground">{info.pickType ? `${info.pickType} · ` : ''}{info.pick || '-'}</div>
                </div>
                <div className="rounded-lg bg-pitch-50/60 px-3 py-2">
                    <div className="text-[11px] text-muted">Confidence</div>
                    <div className="flex items-center gap-2">
                        <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-line">
                            <div className="h-full rounded-full bg-pitch-500" style={{ width: `${confidence * 10}%` }} />
                        </div>
                        <span className="text-sm font-bold text-foreground">{confidence}</span>
                    </div>
                </div>
            </div>

            <div className="mt-3 flex-grow">
                <div className="text-[11px] text-muted">Reason</div>
                <p className="mt-0.5 line-clamp-3 text-sm text-foreground/90">{info.reason.en || info.reason.id || '-'}</p>
            </div>

            <div className="mt-4 flex items-center justify-between border-t border-line pt-3">
                <div className="flex items-center gap-1">
                    <Tooltip>
                        <Button isIconOnly variant="ghost" size="sm" aria-label="Share as image"
                            onPress={() => { setOpenDialog({ isOpen: true, type: 'share' }) }}>
                            <Share2 size={15} />
                        </Button>
                        <Tooltip.Content>Share as image</Tooltip.Content>
                    </Tooltip>
                    <Tooltip>
                        <Button isIconOnly variant="ghost" size="sm" aria-label="Copy note text"
                            onPress={() => {
                                navigator.clipboard.writeText(generatedPost);
                                toast.success("Copied to clipboard")
                            }}>
                            <Copy size={15} />
                        </Button>
                        <Tooltip.Content>Copy note text</Tooltip.Content>
                    </Tooltip>
                </div>
                <div className="flex items-center gap-1.5">
                    <Button variant="secondary" size="sm" onPress={() => { onClick() }}>
                        <Pencil size={13} />
                        Edit
                    </Button>
                    <Button isIconOnly variant="danger-soft" size="sm" aria-label="Delete note"
                        onPress={() => { setOpenDialog({ isOpen: true, type: 'delete' }) }}>
                        <Trash2 size={15} />
                    </Button>
                </div>
            </div>

            <DialogComponent open={openDialog.isOpen} setOpenDialog={() => {
                setOpenDialog({ isOpen: false, type: '' })
            }}>
                {
                    openDialog.type == 'share' &&
                    <CardShareComponent note={info} />
                }
                {
                    openDialog.type == 'delete' &&
                    <DeleteForm noteId={info.id || info._id || ''} closeDialog={() => { setOpenDialog({
                        isOpen: false, type: ''
                    }) }} callback={onChanged}/>
                }
            </DialogComponent>
        </Card>
    )
}

export default MatchCard

interface MatchCardProps {
    info: MatchNotes,
    onClick: any,
    onChanged?: () => void
}
