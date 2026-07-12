'use client'
import Link from "next/link";
import { Card, Chip } from "@heroui/react";
import { CalendarClock, Lock, Trophy } from "lucide-react";
import { formatDate, formatDateTime, timeConverter } from "@/utlis/time/time";

const resultChip = (note: FeedNote): { color: 'success' | 'danger' | 'default', label: string } => {
    if (note.pickResult === 'true') { return { color: 'success', label: 'WIN' } }
    if (note.pickResult === 'false') { return { color: 'danger', label: 'LOSE' } }
    return { color: 'default', label: 'TBD' }
}

function FeedCard ({ note }: { note: FeedNote }) {
    const chip = resultChip(note)
    const confidence = Math.min(Math.max(Number(note.confidence) || 0, 0), 10)

    return (
        <Card className="flex h-full flex-col p-5">
            <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                    <div className="truncate text-base font-bold text-ink">{note.title}</div>
                    <div className="mt-0.5 text-xs text-muted">
                        by{' '}
                        {note.user
                            ? <Link href={`/analyst/${note.user._id}`} className="font-semibold text-pitch-600 hover:underline">{note.user.name}</Link>
                            : 'Analyst'}
                        {' · '}{formatDateTime(note.createdDate)}
                    </div>
                </div>
                {!note.locked && <Chip color={chip.color} size="sm">{chip.label}</Chip>}
            </div>

            <div className="mt-3 flex items-center gap-1.5 text-xs text-muted">
                <CalendarClock size={14} className="shrink-0" />
                {formatDate(note.kickOffTime)} · {timeConverter(new Date(note.kickOffTime))} UTC
            </div>

            {note.locked ? (
                <div className="mt-4 flex flex-grow flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-line bg-pitch-50/40 p-5 text-center">
                    <Lock size={18} className="text-pitch-600" />
                    <div className="text-sm font-semibold text-ink">Pick locked until kickoff</div>
                    <p className="text-xs text-muted">Analysis opens when the match starts — no copy-picking here.</p>
                </div>
            ) : (
                <>
                    <div className="mt-4 grid grid-cols-2 gap-3">
                        <div className="rounded-lg bg-pitch-50/60 px-3 py-2">
                            <div className="text-[11px] text-muted">Pick</div>
                            <div className="truncate text-sm font-bold text-foreground">{note.pickType ? `${note.pickType} · ` : ''}{note.pick || '-'}</div>
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
                        <p className="mt-0.5 line-clamp-3 text-sm text-foreground/90">{note.reason?.en || note.reason?.id || '-'}</p>
                    </div>
                    {Boolean(note.pointsAwarded) && (
                        <div className="mt-3 flex items-center gap-1.5 text-xs font-semibold text-win">
                            <Trophy size={13} /> +{note.pointsAwarded} pts
                        </div>
                    )}
                </>
            )}
        </Card>
    )
}

export default FeedCard
